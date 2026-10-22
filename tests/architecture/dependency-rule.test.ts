import { readdirSync, readFileSync, statSync } from "fs";
import { dirname, join, normalize, relative, sep } from "path";
import { describe, expect, it } from "@jest/globals";

// The dependency rule of Clean Architecture, as a test: core/ is not an Nx project, so the
// Nx module boundaries (see .eslintrc.json) cannot see inside it. Each layer lists the
// layers it may import; any other import fails with the file and the import that broke it.
const ALLOWED: Record<string, string[]> = {
    domain: ['domain'],
    dtos: ['dtos'],
    view: ['view'],
    controllers: ['controllers', 'domain'],
    // a use case folder also hosts its controller, presenter and view adapters
    application: ['application', 'domain', 'dtos', 'controllers', 'view'],
    gateways: ['gateways', 'application', 'dtos'],
};

const CORE = join(__dirname, '..', '..', 'core');
const IMPORT = /^\s*(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]/gm;

const tsFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return tsFiles(path);
        return path.endsWith('.ts') ? [path] : [];
    });

const importsOf = (file: string): string[] =>
    [...readFileSync(file, 'utf8').matchAll(IMPORT)].map((m) => m[1]);

const layerOf = (file: string): string => relative(CORE, file).split(sep)[0];

const files = tsFiles(CORE);

describe('Dependency rule of core/', () => {

    it('knows the layer of every core file', () => {
        expect(files.map(layerOf).filter((layer) => !ALLOWED[layer])).toEqual([]);
    });

    it.each(Object.keys(ALLOWED))('%s only imports the layers it is allowed to', (layer) => {
        const violations = files.filter((file) => layerOf(file) === layer).flatMap((file) =>
            importsOf(file).flatMap((spec) => {
                if (!spec.startsWith('.')) return [];
                const target = normalize(join(dirname(file), spec));
                const targetLayer = relative(CORE, target).split(sep)[0];
                return ALLOWED[layer].includes(targetLayer) ? [] : [`${relative(CORE, file)} -> ${spec}`];
            }));
        expect(violations).toEqual([]);
    });

    it('stays framework-free: no package import, no import outside core/', () => {
        const violations = files.flatMap((file) =>
            importsOf(file)
                .filter((spec) => !spec.startsWith('.') || relative(CORE, normalize(join(dirname(file), spec))).startsWith('..'))
                .map((spec) => `${relative(CORE, file)} -> ${spec}`));
        expect(violations).toEqual([]);
    });
});
