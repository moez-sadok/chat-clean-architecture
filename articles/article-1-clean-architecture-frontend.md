# Clean Architecture for the Frontend: A Practical Guide with Angular

> _Your use cases shouldn't know they're running in a browser. Here's how to enforce that with Clean Architecture, using Angular as the framework layer._

---

## Table of Contents

1. [Why Clean Architecture on the Frontend?](#1-why-clean-architecture-on-the-frontend)
2. [The Layers and the Dependency Rule](#2-the-layers-and-the-dependency-rule)
3. [A Simple Use Case: Get Tasks](#3-a-simple-use-case-get-tasks)
4. [The Application Layer: Use Case and Ports](#4-the-application-layer-use-case-and-ports)
5. [The Adapters Layer: Presenter and View](#5-the-adapters-layer-presenter-and-view)
6. [The Framework Layer: Repository, Component, and Providers](#6-the-framework-layer-repository-component-and-providers)
7. [The Full Flow: From User Click to Screen Update](#7-the-full-flow-from-user-click-to-screen-update)
8. [The Power of Ports: Swappable Dependencies](#8-the-power-of-ports-swappable-dependencies)
9. [SOLID Principles at Work](#9-solid-principles-at-work)
10. [Project Structure](#10-project-structure)
11. [Conclusion](#11-conclusion)

---

## 1. Why Clean Architecture on the Frontend?

Most frontend applications start clean and end tangled. HTTP calls happen inside components. View formatting logic mixes with API response handling. State management is coupled to a specific library. When the framework changes -- or even when a library updates -- everything breaks.

But there's a deeper reason: **modern frontend apps carry real logic.** Even when business rules live on the backend, the UI layer isn't just "display what the API returns." Consider what a typical SPA actually does:

- **Loading and error states**: show a spinner while fetching, display an error message on failure, retry on network timeout -- none of this comes from the API.
- **Error differentiation and recovery**: the backend returns a 401 (redirect to login), a 404 (show an empty state), or a 500 (show a generic message and offer retry). The frontend decides what to do with each case -- the API just returns a status code.
- **Client-side transformations**: the API returns `done: true`, but the view needs a colored tag -- green for done, red for pending. A timestamp comes back as `2024-03-21T10:30:00Z`, but the UI shows "yesterday at 10:30 AM."
- **Filtering, grouping, and aggregation**: the API returns a flat list, but the screen needs tasks grouped by category, filtered by status, or summarized -- a total, an average, a count of completed items. These aggregations don't exist on the API.
- **Client-side decryption (E2EE)**: in end-to-end encrypted apps, the API returns ciphertext. The frontend decrypts it before displaying -- a transformation that *must* happen on the client, never on the server.
- **Adapting to API constraints**: sometimes you can't change the backend. The API returns 100 fields, but the screen needs 5. Or it returns dates as strings, but the UI needs `Date` objects. Or it doesn't support pagination, so you paginate on the client.
- **Orchestration across multiple calls**: display a dashboard that combines data from `/tasks`, `/users`, and `/projects` -- the API doesn't have a single endpoint for this, so the frontend orchestrates, enriches, and merges.
- **Retry and resilience strategies**: a flaky network doesn't mean the app stops working. The use case can retry a failed request, apply exponential backoff, or fall back to cached data -- all without the component knowing.
- **Offline and optimistic updates**: update the UI immediately, sync with the backend later. The frontend manages its own state independently of the API.

This is real logic. It deserves the same architectural rigor we give to backend code. When it lives in components, it's untestable, unreusable, and coupled to the framework. When it lives in use cases and presenters, it's portable, testable, and framework-agnostic.

Clean Architecture, as defined by Robert C. Martin, solves this with one rule:

> **Dependencies point inward. Inner layers never know about outer layers.**

On the frontend -- where the UI is a **full TypeScript SPA** -- Clean Architecture means:

- Your **use cases** don't know Angular, React, or Vue exist.
- Your **presentation logic** doesn't know whether data came from `fetch`, `HttpClient`, or a mock.
- Your **framework layer** is a thin shell that wires everything together.

The payoff: when Angular 16 introduced Signals, or when your team considers migrating to React -- the core of your application doesn't change. Only the outermost shell does.

---

## 2. The Layers and the Dependency Rule

In a frontend SPA where business logic lives on the backend API, we focus on three layers (the domain layer is minimal -- our "domain" is essentially the API contract):

```
                    +--------------------------+
                    |      APPLICATION          |
                    |  Use Cases, Ports          |
                    |  (pure TypeScript)         |
                    +------------+-------------+
                                 |
                    +------------v-------------+
                    |       ADAPTERS            |
                    |  Presenters, Views         |
                    |  DTOs, Gateways            |
                    +------------+-------------+
                                 |
                    +------------v-------------+
                    |      FRAMEWORKS           |
                    |  Angular, React, fetch     |
                    |  Components, Providers     |
                    |  HTTP clients               |
                    +--------------------------+
```

Each layer has a clear responsibility:

| Layer           | What lives here                                                   | Depends on       |
| --------------- | ----------------------------------------------------------------- | ---------------- |
| **Application** | Use cases, input/output port interfaces, data models              | Nothing external |
| **Adapters**    | Presenters, views, controllers, DTOs, gateways                    | Application only |
| **Frameworks**  | Angular components, providers, `fetch` / `HttpClient`, DB drivers | Everything above |

**The rule is absolute**: an inner layer never imports from an outer layer. A Use Case never imports `@angular/core`. A Presenter never imports `fetch`. If you see such an import, the architecture is broken.

---

## 3. A Simple Use Case: Get Tasks

To illustrate the pattern, we'll build a simple use case that every developer knows: **listing tasks** (a todo list). The frontend fetches tasks from a REST API and displays them. Business logic (validation, permissions, sorting) lives on the backend -- the frontend orchestrates the flow: fetch, format, display.

The flow we want:

```
Component -> UseCase (via IInput port) -> Presenter (via IOutput port) -> View
```

The component acts as the **controller**: it receives user intent and calls the use case. The use case fetches data through a repository port and pushes results through the presenter to the view. The view updates the screen.

---

## 4. The Application Layer: Use Case and Ports

The application layer defines **what the system does** (use cases) and **what it needs** (ports). It is pure TypeScript -- no framework imports whatsoever.

### The Input Port -- What the Controller Calls

```typescript
// core/application/usecases/get-tasks/interactor/getTasks.controller.input.ts

export interface IGetTasksInput {
  getTasks(): Promise<TaskOutputData[]>;
}
```

### The Output Port -- What the Use Case Calls to Present Results

```typescript
// core/application/usecases/get-tasks/interactor/getTasks.presenter.output.ts

export interface IGetTasksPresenterOutput {
  presentTasks(tasks: TaskOutputData[]): TaskOutputData[];
  presentLoading(loading?: boolean): void;
  presentError(error: string): void;
}
```

### The Data Model

```typescript
// core/application/usecases/get-tasks/interactor/getTasks.response.data.ts

export interface TaskOutputData {
  id: number;
  title: string;
  done: boolean;
}
```

### The Repository Port -- What the Use Case Needs for Data Access

```typescript
// core/application/ports/task-repository.ts

export interface ITaskRepository {
  getAllTasks(): Promise<TaskOutputData[]>;
}
```

The repository returns a `Promise` because data comes from a backend API. But the Use Case doesn't know that -- it could be `fetch`, `HttpClient`, `localStorage`, or a plain array. It just awaits the result.

### The Use Case -- Orchestration with Loading and Error Handling

```typescript
// core/application/usecases/get-tasks/interactor/getTasks.feature.ts

export class GetTasksUseCase implements IGetTasksInput {
  constructor(
    private taskRepository: ITaskRepository,
    private presenter: IGetTasksPresenterOutput,
  ) {}

  async getTasks(): Promise<TaskOutputData[]> {
    try {
      this.presenter.presentLoading(true);
      const tasks = await this.taskRepository.getAllTasks();

      // UI business logic lives here: filter, sort, group by category,
      // enrich data from another repository, or adapt the API response
      // to what the screen actually needs.

      return this.presenter.presentTasks(tasks);
    } catch (error) {
      // Handle different error types: unauthorized (redirect to login),
      // not found (show empty state), network failure (retry strategy),
      // or internal server error (show a generic message).

      this.presenter.presentError(error.message || 'An unexpected error occurred');
      return [];
    } finally {
      this.presenter.presentLoading(false);
    }
  }
}
```

This is frontend logic that doesn't belong in a component. The loading/error flow is use case orchestration: show loading, attempt fetch, present results or error. The Use Case doesn't know _how_ loading is displayed (spinner? skeleton? progress bar?) -- it tells the Presenter _what happened_, and the Presenter updates the View.

---

## 5. The Adapters Layer: Presenter and View

The adapters layer sits between the application and the framework. It converts use case output into view-ready data.

### The View Model -- What the Screen Displays

```typescript
// core/application/usecases/get-tasks/presenter/getTasks.view.model.ts

export interface TaskViewModel {
  // No id -- the view doesn't need it, only the API does
  title: string;
  statusColor: 'green' | 'red';
}

export interface TaskListViewModel {
  tasks: TaskViewModel[];
  loading: boolean;
  error: string | null;
}
```

### The View Interface -- A Port for the Screen

```typescript
// core/application/usecases/get-tasks/presenter/getTasks.view.ts

export interface IGetTasksView {
  readonly vm: TaskListViewModel;
  getViewModel(): TaskListViewModel;
  render(tasks: TaskViewModel[]): void;
  setLoading(loading: boolean): void;
  setError(error: string): void;
}
```

The View interface exposes a `vm` property that holds the current state as a plain object. No framework dependency. No reactive primitive. Just data.

### The Presenter -- Maps Use Case Output to View Models

```typescript
// core/application/usecases/get-tasks/presenter/getTasks.presenter.ui.ts

export class GetTasksPresenterUi implements IGetTasksPresenterOutput {
  constructor(private view: IGetTasksView) {}

  presentTasks(tasks: TaskOutputData[]): TaskOutputData[] {
    const viewModels: TaskViewModel[] = tasks.map((t) => ({
      title: t.title,
      statusColor: t.done ? 'green' : 'red', // API boolean → visual indicator
    }));
    this.view.render(viewModels);
    return tasks;
  }

  presentLoading(loading = true): void {
    this.view.setLoading(loading);
  }

  presentError(error: string): void {
    this.view.setError(error);
  }
}
```

The Presenter's job is clear: take API data, transform it into view models, and push it to the View. It doesn't know how the View renders -- it just calls `render()`.

### The Concrete View -- Simple In-Memory State

This is the simplest possible View implementation. It manages the view model as a plain object in memory -- no reactivity, no framework dependency, no change detection:

```typescript
// core/application/usecases/get-tasks/view/getTasks.web.view.ts

export class GetTasksClientView implements IGetTasksView {
  readonly vm: TaskListViewModel;

  constructor() {
    this.vm = { tasks: [], loading: false, error: null };
  }

  getViewModel(): TaskListViewModel {
    return this.vm;
  }

  render(tasks: TaskViewModel[]): void {
    this.vm.tasks = tasks;
    this.vm.loading = false;
    this.vm.error = null;
  }

  setLoading(loading: boolean): void {
    this.vm.loading = loading;
  }

  setError(error: string): void {
    this.vm.error = error;
    this.vm.loading = false;
  }
}
```

This view can be used in **any** UI framework -- Angular, React, Vue -- or even in a unit test with no framework at all. The presenter calls `render()`, and the view updates its internal state. The component reads `vm` whenever it needs the current data.

This simplicity is intentional. The View doesn't need to know about Signals, Observables, or change detection. It's a plain object that holds state. The framework layer handles how that state reaches the screen.

---

## 6. The Framework Layer: Repository, Component, and Providers

This is the outermost layer -- the only place where Angular and `fetch` appear.

### The HTTP Repository -- A Concrete Adapter for the API

The Use Case depends on `ITaskRepository`. Here's a concrete implementation that fetches tasks from a REST API using `fetch`:

```typescript
// libs/tasks/frameworks/http/task-http.repository.ts

import { ITaskRepository } from '@app/core-ports';
import { TaskOutputData } from '@app/core-features';

export class TaskHttpRepository implements ITaskRepository {
  constructor(private apiBaseUrl: string) {}

  async getAllTasks(): Promise<TaskOutputData[]> {
    const response = await fetch(`${this.apiBaseUrl}/tasks`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }

    const data = await response.json();

    return data.map(
      (item: any) =>
        ({
          id: item.id,
          title: item.title,
          done: item.done,
        }) as TaskOutputData,
    );
  }
}
```

This class lives in the **framework layer**. It imports `fetch` (a browser/Node API) and knows the API URL structure. The Use Case never sees any of this -- it just calls `await this.taskRepository.getAllTasks()` and gets back `TaskOutputData[]`.

For testing, you swap this with an in-memory implementation -- no HTTP calls, no mocking `fetch`:

```typescript
// libs/tasks/frameworks/db/in-memory/task-in-memory.repository.ts

export class TaskInMemoryRepository implements ITaskRepository {
  private tasks: TaskOutputData[] = [
    { id: 1, title: 'Buy groceries', done: false },
    { id: 2, title: 'Clean the house', done: true },
  ];

  async getAllTasks(): Promise<TaskOutputData[]> {
    return [...this.tasks];
  }
}
```

Same interface, same contract, different infrastructure. The Use Case works identically with both.

### The Component -- Acts as the Controller

```typescript
// libs/.../components/task-list/task-list.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGetTasksInput, IGetTasksView } from '@app/core-features';
import { GET_TASKS_USE_CASE, GET_TASKS_VIEW } from '../../providers/task.providers';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TaskListComponent {
  constructor(
    @Inject(GET_TASKS_USE_CASE) private useCase: IGetTasksInput,
    @Inject(GET_TASKS_VIEW) public view: IGetTasksView,
  ) {
    // The component acts as the controller: it calls the use case directly
    this.useCase.getTasks();
  }

  get vm() {
    return this.view.getViewModel();
  }
}
```

The component is minimal. No `ChangeDetectorRef`. No reactive subscriptions. No state management. No HTTP calls. It does two things:

1. **Controller**: call the use case when the page loads
2. **Template binding**: expose the view model to the template

Everything else -- data fetching, formatting, state transitions -- lives in the layers above.

### The Template

```html
<!-- task-list.component.html -->
<div *ngIf="vm.loading">Loading tasks...</div>
<div *ngIf="vm.error" class="error">{{ vm.error }}</div>

<ul *ngIf="!vm.loading">
  <li *ngFor="let task of vm.tasks">
    <span [style.color]="task.statusColor">●</span> {{ task.title }}
  </li>
</ul>
```

### The Providers -- The Composition Root

This is where all the wiring happens. Factory functions create instances and inject dependencies:

```typescript
// libs/.../providers/task.providers.ts
import { InjectionToken } from '@angular/core';
import { GetTasksUseCase, GetTasksClientView, GetTasksPresenterUi, IGetTasksInput, IGetTasksPresenterOutput, IGetTasksView } from '@app/core-features';
import { ITaskRepository } from '@app/core-ports';
import { TaskHttpRepository } from '@app/task-http';

export const TASK_REPOSITORY = new InjectionToken<ITaskRepository>('TaskRepository');
export const GET_TASKS_VIEW = new InjectionToken<IGetTasksView>('GetTasksView');
export const GET_TASKS_PRESENTER = new InjectionToken<IGetTasksPresenterOutput>('GetTasksPresenter');
export const GET_TASKS_USE_CASE = new InjectionToken<IGetTasksInput>('GetTasksUseCase');

export const taskProviders = [
  {
    // Repository -- swap here for tests or offline mode
    provide: TASK_REPOSITORY,
    useFactory: () => new TaskHttpRepository('https://api.example.com'),
  },
  {
    // View -- simple in-memory implementation
    provide: GET_TASKS_VIEW,
    useFactory: () => new GetTasksClientView(),
  },
  {
    // Presenter
    provide: GET_TASKS_PRESENTER,
    useFactory: (view: IGetTasksView) => new GetTasksPresenterUi(view),
    deps: [GET_TASKS_VIEW],
  },
  {
    // Use Case
    provide: GET_TASKS_USE_CASE,
    useFactory: (repo: ITaskRepository, presenter: IGetTasksPresenterOutput) => new GetTasksUseCase(repo, presenter),
    deps: [TASK_REPOSITORY, GET_TASKS_PRESENTER],
  },
];
```

The provider is the **only place** that knows about concrete classes. The component, the use case, the presenter -- they all work with interfaces. If you want to swap the API for a mock, change one line:

```typescript
// For tests or offline: swap the repository
{ provide: TASK_REPOSITORY, useFactory: () => new TaskInMemoryRepository() }
```

---

## 7. The Full Flow: From User Click to Screen Update

```
User opens the Task List page
        |
        v
[TaskListComponent] useCase.getTasks()   <-- component acts as the controller
        |
        v
[GetTasksUseCase] calls await taskRepository.getAllTasks()
        |
        v
[TaskHttpRepository] fetch('https://api.example.com/tasks')
        |  returns TaskOutputData[]
        v
[UseCase] calls presenter.presentTasks(tasks)
        |
        v
[GetTasksPresenterUi] maps API data to TaskViewModel[]
        |  calls view.render(taskViewModels)
        v
[GetTasksClientView]
        |  this.vm.tasks = tasks
        |  this.vm.loading = false
        v
[Angular Template] reads vm.tasks --> renders the list
```

Each step only knows about the next one through an interface. The component doesn't know about `fetch`. The Use Case doesn't know about Angular. The Presenter doesn't know about the API URL. No step knows about the concrete implementation of any other step.

---

## 8. The Power of Ports: Swappable Dependencies

Every external dependency hides behind a port interface. You swap at the composition root -- zero changes to business logic.

### Repository -- How Data Is Fetched

| Adapter                      | Backed by             | Use case                 |
| ---------------------------- | --------------------- | ------------------------ |
| `TaskHttpRepository`         | REST API (`fetch`)    | Production               |
| `TaskInMemoryRepository`     | Plain array in memory | Unit / integration tests |
| `TaskLocalStorageRepository` | `localStorage`        | Offline-first / PWA      |
| `TaskIndexedDbRepository`    | IndexedDB             | Large offline datasets   |

### Presenter -- How Data Is Formatted

| Adapter                | Target             | Use case        |
| ---------------------- | ------------------ | --------------- |
| `GetTasksPresenterUi`  | UI view models     | SPA display     |
| `GetTasksPresenterApi` | HTTP response DTOs | Server-side API |

### View -- How State Is Managed

| Adapter                | Mechanism              | Use case               |
| ---------------------- | ---------------------- | ---------------------- |
| `GetTasksClientView`   | Plain object in memory | Default / simple apps  |
| Reactive view (Part 2) | `IReactive<T>` port    | `OnPush` / performance |

That last one -- the View -- opens an interesting door. Our `GetTasksClientView` stores state as plain properties. It works, but it has a limitation: **Angular's `OnPush` change detection won't detect mutations to plain properties.** For simple cases or default change detection, this is fine. But for production apps that need `OnPush` performance, we'll need a reactive View.

In **Part 2**, we'll show how to introduce an `IReactive<T>` port that abstracts the reactive primitive -- and swap between RxJS Observables and Angular Signals by changing a single line.

---

## 9. SOLID Principles at Work

### Single Responsibility (SRP)

| Class                 | Responsibility                              | Changes when...                   |
| --------------------- | ------------------------------------------- | --------------------------------- |
| `TaskListComponent`   | Controller: trigger use case, bind template | UI framework or routing changes   |
| `GetTasksUseCase`     | Orchestrate "fetch tasks" flow              | Orchestration logic changes       |
| `GetTasksPresenterUi` | Map API output to view models               | Display format changes            |
| `GetTasksClientView`  | Manage view state in memory                 | View state shape changes          |
| `TaskHttpRepository`  | Fetch data from REST API                    | API URL or response shape changes |

Each class has exactly one reason to change. No class does two jobs.

### Open/Closed (OCP)

Add a new repository adapter (e.g., GraphQL)? Implement `ITaskRepository`, register in the provider. No existing code changes. The system is open for extension, closed for modification.

### Liskov Substitution (LSP)

Every `ITaskRepository` implementation is fully substitutable. The Use Case operates correctly with any of them -- `TaskHttpRepository`, `TaskInMemoryRepository`, or `TaskLocalStorageRepository`. The behavioral contract ("return all tasks as `TaskOutputData[]`") is honored by all.

### Interface Segregation (ISP)

Each port interface is narrow and role-specific. `IGetTasksInput` has one method. `IGetTasksPresenterOutput` has one method. `ITaskRepository` has one method. No client is forced to depend on methods it doesn't use.

### Dependency Inversion (DIP)

```
GetTasksUseCase (application layer)
        |
        | depends on
        v
ITaskRepository (port -- abstraction)
        ^
        | implements
        |
TaskHttpRepository / TaskInMemoryRepository (framework layer)
```

High-level modules depend on abstractions. Low-level modules implement those abstractions. Dependencies always point inward.

---

## 10. Project Structure

```
core/
  application/
    usecases/get-tasks/
      interactor/
        getTasks.feature.ts            <-- Use Case
        getTasks.controller.input.ts   <-- Input port (IGetTasksInput)
        getTasks.presenter.output.ts   <-- Output port (IGetTasksPresenterOutput)
        getTasks.response.data.ts      <-- Output data model
      presenter/
        getTasks.presenter.ui.ts       <-- UI Presenter
        getTasks.view.ts               <-- View interface (IGetTasksView)
        getTasks.view.model.ts         <-- View model
      view/
        getTasks.web.view.ts           <-- Simple in-memory View
    ports/
      task-repository.ts               <-- Repository port (ITaskRepository)

libs/<domain>/frameworks/
  http/
    task-http.repository.ts            <-- HTTP adapter (fetch)
  db/
    in-memory/
      task-in-memory.repository.ts     <-- In-memory adapter (tests)
  ui/angular/
    components/                        <-- Angular components
    providers/                         <-- DI wiring (composition root)
```

---

## 11. Conclusion

Clean Architecture on the frontend isn't over-engineering -- it's **insurance**. Insurance against framework churn, against API changes that cascade through your entire UI, and against the coupling that turns every small change into a cascade of broken tests.

The core idea is simple:

1. **Use Cases** orchestrate the flow through port interfaces -- pure TypeScript, no framework.
2. **Presenters** transform API output into view-ready data.
3. **Views** manage state in memory -- no framework dependency.
4. **Repositories** fetch data from the backend API -- swappable via the port.
5. **The framework** (Angular, React) is a thin, replaceable shell that wires everything together.

Our `GetTasksClientView` works perfectly as a starting point -- it's simple, testable, and framework-agnostic. But it stores state as plain mutable properties, which means Angular's `OnPush` change detection can't track updates automatically.

In **Part 2**, we'll solve this by introducing `IReactive<T>` -- a port that abstracts the reactive primitive. The View will delegate state management to an injected reactive adapter, and we'll show how to swap from RxJS Observables to Angular Signals by changing a single line in the provider. Same architecture, same flow, same component -- just a smarter View.

---

_Next: [Part 2 -- Reactivity Is an Infrastructure Concern: Swapping from RxJS to Signals Without Touching a Single Component](./article-2-reactive-port-adapter.md)_
