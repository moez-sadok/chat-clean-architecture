# Reactivity Is an Infrastructure Concern: Swapping from RxJS to Signals Without Touching a Single Component

> *Part 2 of the Clean Architecture Frontend series. In [Part 1](./article-1-clean-architecture-frontend.md), we built a task list using Clean Architecture with Angular. Now we zoom in on one port -- `IReactive<T>` -- and show how it turns a reactive-paradigm migration into a one-line change.*

---

## 1. The Problem: Reactivity Is Hardcoded

When Angular 16 introduced Signals, teams faced the same question: **how do we migrate?**

The typical answers were painful:

- **Rewrite**: replace `BehaviorSubject` with `signal()` across every component, service, and template. Hundreds of file changes. Weeks of regression testing.
- **Convert**: use `toSignal()` / `toObservable()` interop. Mixing paradigms. Neither fully Signal nor fully Observable.
- **Ignore**: keep RxJS everywhere. Accumulate tech debt.

All three share one root cause: **reactivity was hardcoded into the business logic and view layer.** `BehaviorSubject` appeared directly in services, components, and view models. When the primitive changed, everything touching it changed too.

In [Part 1](./article-1-clean-architecture-frontend.md), every external dependency hid behind a port. The repository port lets us swap databases without touching use cases. What if we applied the same principle to reactivity?

---

## 2. The Insight: Reactivity Is Infrastructure

In Clean Architecture, databases, HTTP clients, and web frameworks are infrastructure. We put them behind ports and inject adapters at the composition root. But reactivity? Most developers treat it as "just how the frontend works," and it leaks across every layer.

> **Reactivity is an infrastructure concern, not a business concern. It belongs behind a port interface, just like a database or an HTTP client.**

A View doesn't care *how* data becomes reactive. It cares about three operations: **read** the current value, **set** a new one, **update** based on the previous one. Whether that's `signal()`, `BehaviorSubject`, Vue's `ref()`, or a plain object with a callback is an implementation detail -- one that should be injectable and swappable.

---

## 3. The Port: `IReactive<T>`

The port lives in the adapters layer (`core/view/`) and defines the **minimum contract** for reactive state:

```typescript
// core/view/reactive.ts
export interface IReactive<T> {
    readonly data: T;
    set(data: T): void;
    change(updater: (val: T) => T): void;
}
```

Three operations. Zero imports. No Angular. No RxJS. No framework of any kind.

Notice what's deliberately **absent**: no `subscribe()` (an RxJS concept), no `computed()` (a Signal concept), no `pipe()`, no change detection hooks (an Angular concept). The interface is segregated to the minimum the View needs (ISP).

### How the View Consumes It

The View class from Part 1 receives `IReactive<T>` by constructor injection:

```typescript
// core/application/usecases/get-tasks/view/getTasks.web.reactive.view.ts

export class GetTasksClientReactiveView implements IGetTasksReactiveView {

  readonly vm: IReactive<TaskListViewModel>;

  constructor(reactive: IReactive<TaskListViewModel>) {
    this.vm = reactive;
    this.vm.set({ tasks: [], loading: false, error: null });
  }

  getViewModel(): TaskListViewModel {
    return this.vm.data;
  }

  render(tasks: TaskViewModel[]): void {
    this.vm.change(prev => ({ ...prev, tasks, loading: false, error: null }));
  }

  setLoading(loading: boolean): void {
    this.vm.change(prev => ({ ...prev, loading }));
  }

  setError(error: string): void {
    this.vm.change(prev => ({ ...prev, error, loading: false }));
  }
}
```

It uses only `set()`, `change()`, and `data`. It never calls `signal()`, `BehaviorSubject`, `next()`, or `update()`. It works identically with Signals, Observables, or any future primitive -- without a single line change.

---

## 4. The Adapters: Pure Signal, Pure Observable

Each adapter lives in the **framework layer** (`libs/`), pure in its own paradigm. No mixing.

```typescript
// libs/.../adapters/reactive-ng-signal.adapter.ts
export class ReactiveNgSignalAdapter<T> implements IReactive<T> {

    private readonly _ngSignal = signal<T>(undefined as T);

    get data(): T { return this._ngSignal(); }
    set(data: T): void { this._ngSignal.set(data); }
    change(updater: (val: T) => T): void { this._ngSignal.update(updater); }
}
```

The `data` getter is a **signal read**, so Angular's change detection tracks it in templates automatically -- `OnPush` just works.

```typescript
// libs/.../adapters/reactive-rxjs-observable.adapter.ts
export class ReactiveRxjsObservableAdapter<T> implements IReactive<T>, IAngularChangeDetectable {

    private readonly _subject = new BehaviorSubject<T>(undefined as T);
    readonly data$: Observable<T> = this._subject.asObservable();

    get data(): T { return this._subject.getValue(); }
    set(data: T): void { this._subject.next(data); }
    change(updater: (val: T) => T): void {
        this._subject.next(updater(this._subject.getValue()));
    }

    bindChangeDetection(cdRef: ChangeDetectorRef): void {
        this.data$.subscribe(() => cdRef.markForCheck());
    }
}
```

Pure RxJS. `data$` stays available as a bonus for consumers who need stream operators (`debounceTime`, `combineLatest`). But notice the **second interface** -- that's where change detection gets interesting.

---

## 5. The Challenge: Framework-Specific Change Detection

`OnPush` doesn't detect `BehaviorSubject.getValue()` changes, but it **does** detect `signal()` reads. Signal works out of the box; RxJS needs `markForCheck()`.

The wrong fix is putting `setDetector()` on `IReactive<T>`. That forces the Signal adapter to implement a no-op (ISP violation) and shapes the core port around Angular's change detection -- meaningless the moment you move to React.

The right fix is a **separate framework-layer interface**:

```typescript
// libs/.../adapters/angular-change-detectable.ts
export interface IAngularChangeDetectable {
    bindChangeDetection(cdRef: ChangeDetectorRef): void;
}

export function isChangeDetectable(obj: unknown): obj is IAngularChangeDetectable {
    return typeof obj === 'object' && obj !== null && 'bindChangeDetection' in obj;
}
```

- **Signal adapter**: implements only `IReactive<T>`. Signals are tracked automatically.
- **RxJS adapter**: implements `IReactive<T>` **and** `IAngularChangeDetectable`.
- **Core `IReactive<T>`**: knows nothing about either. Stays pure.

---

## 6. The Component: Stable Across All Adapters

The component lives in the framework layer, so it may import `isChangeDetectable`. But it never knows *which* adapter it received:

```typescript
// libs/.../components/task-list/task-list.component.ts
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TaskListComponent {

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject(GET_TASKS_USE_CASE) private useCase: IGetTasksInput,
    @Inject(GET_TASKS_REACTIVE_VIEW) public view: IGetTasksReactiveView
  ) {
    // The component acts as the controller
    this.useCase.getTasks();

    // Framework-layer concern: if the reactive adapter needs CD, bind it
    if (isChangeDetectable(this.view.vm)) {
      this.view.vm.bindChangeDetection(this.cdRef);
    }
  }

  get vm() { return this.view.getViewModel(); }
}
```

The template reads `vm` synchronously, so it works with any adapter:

```html
<div *ngIf="vm.loading">Loading tasks...</div>
<div *ngIf="vm.error" class="error">{{ vm.error }}</div>

<ul *ngIf="!vm.loading">
  <li *ngFor="let task of vm.tasks" [class.done]="task.completed">
    {{ task.title }}
  </li>
</ul>
```

The `isChangeDetectable` check is the only adapter-aware line, and it's **stable**: with the Signal adapter it returns `false` and does nothing; with the RxJS adapter it binds change detection. The component handles both -- forever.

---

## 7. The Swap: One Line

```typescript
// libs/.../providers/task.providers.ts

export const taskProviders = [
    {   // View -- THE SWAP POINT: comment one, uncomment the other
        provide: GET_TASKS_REACTIVE_VIEW,

        // Signal strategy:
        useFactory: () => new GetTasksClientReactiveView(
            new ReactiveNgSignalAdapter<TaskListViewModel>()
        )

        // RxJS Observable strategy:
        // useFactory: () => new GetTasksClientReactiveView(
        //     new ReactiveRxjsObservableAdapter<TaskListViewModel>()
        // )
    },
    // ... Presenter and Use Case providers (unchanged)
];
```

**That's it.** The entire reactive infrastructure swaps underneath, and the application behaves identically.

| Layer | File | Changed? |
|-------|------|----------|
| Domain | `task.entity.ts` | No |
| Application | `getTasks.feature.ts` (Use Case) | No |
| Adapters | `getTasks.presenter.ui.ts` (Presenter) | No |
| Adapters | `getTasks.web.reactive.view.ts` (View) | No |
| Framework | `task-list.component.ts` (Component) | No |
| Framework | `task-list.component.html` (Template) | No |
| Framework | **`task.providers.ts` (Provider)** | **Yes -- 1 line** |

### What Actually Happens Underneath

```
[GetTasksPresenterUi] --> view.render(taskViewModels)
        v
[GetTasksClientReactiveView] --> this.vm.change(prev => ({ ...prev, tasks }))
        v
[IReactive<T>] --- which adapter is behind this port?
        |
        +--> [ReactiveNgSignalAdapter]  signal.update() -> template signal read -> OnPush re-renders
        |
        +--> [ReactiveRxjsObservableAdapter]  subject.next() -> data$ subscription -> markForCheck() -> OnPush re-renders
```

Everything above the port is identical. Only the last step -- *how* the primitive notifies Angular -- differs, and it's fully encapsulated in the adapter.

---

## 8. SOLID in One Pass

| Principle | How it shows up here |
|-----------|----------------------|
| **SRP** | Each adapter has exactly one reason to change: its underlying reactive API. The View's only reason to change is the shape of view state. |
| **OCP** | The View is open for extension (inject any `IReactive<T>`) and closed for modification. Adding a MobX or Vue adapter changes zero existing code. |
| **LSP** | Both adapters honor the same contract: after `set(x)`, `data` returns `x`; `change(fn)` applies `fn` to the current value. True for Signal *and* RxJS. |
| **ISP** | `IReactive<T>` has three members. `bindChangeDetection` lives in a separate framework-layer interface -- two narrow interfaces instead of one fat one. |
| **DIP** | The View (adapters layer) depends on `IReactive<T>`; the adapters (framework layer) implement it. Dependencies point inward. |

---

## 9. Beyond Angular

`IReactive<T>` is pure TypeScript, so the same three methods map onto any reactive primitive:

```typescript
// Vue
class ReactiveVueRefAdapter<T> implements IReactive<T> {
    private readonly _ref: Ref<T> = ref(undefined) as Ref<T>;

    get data(): T { return this._ref.value; }
    set(data: T): void { this._ref.value = data; }
    change(updater: (val: T) => T): void { this._ref.value = updater(this._ref.value); }
}
```

Solid.js wraps `createSignal`. React wraps a value plus a listener set, exposing `subscribe` for `useSyncExternalStore`. In every case `GetTasksClientReactiveView` is untouched -- only the adapter and the wiring change.

That's the promise of Clean Architecture on the frontend: **your business and presentation logic survive framework migrations.**

---

## 10. How This Differs from Existing Approaches

| Approach | What it abstracts | Swap mechanism | Component impact |
|----------|-------------------|----------------|------------------|
| **`toSignal()` / `toObservable()`** | Nothing -- converts between types | Code-level interop | Rewrite imports and usage per component |
| **NgRx Signal Store Port/Adapter** | The state management store | Store implementation swap | Components depend on store port |
| **RxDB Custom Reactivity** | The reactive datatype at library level | Factory injection | Library-level, not architecture-level |
| **This approach: `IReactive<T>`** | **The reactive primitive itself** | Provider swap (1 line) | **Zero component changes** |

`toSignal()` converts an Observable into a Signal -- useful, but you still depend on **both** RxJS and Signals, and every call site changes if Angular deprecates it or you move frameworks. With `IReactive<T>`, the View never knows which primitive is underneath. There's nothing to convert.

---

## 11. Conclusion

Most teams migrating from RxJS to Signals are rewriting hundreds of files. Apply Clean Architecture consistently -- treat **every** external dependency as infrastructure behind a port -- and the migration becomes a one-line provider swap.

1. **Define a port** (`IReactive<T>`) with the minimum contract: read, set, update.
2. **Build pure adapters** -- one per paradigm, each faithful to its own mechanism.
3. **Keep framework concerns** (like Angular change detection) in a separate framework-layer interface, never in the core port.
4. **Inject at the composition root** -- the only place that knows which adapter is in use.
5. **Components stay stable** -- the primitive underneath is invisible to them.

This isn't just Signals vs. Observables. It's a principle: **if it can change, abstract it. If it's a framework detail, don't let it leak inward.**

Angular moved from Zone.js to Signals. React moved from classes to hooks. Vue moved from Options API to Composition API. Every few years the reactive model shifts. Your business logic shouldn't care.

---

*Part 2 of the Clean Architecture Frontend series. [Part 1: Clean Architecture for the Frontend](./article-1-clean-architecture-frontend.md) covers the full pattern -- layers, use cases, presenters, and views.*

*The pattern was implemented in a real-world chat application built with Clean Architecture, featuring real-time WebSocket messaging, multi-room chat, and user management -- all with the same one-line swap capability.*
