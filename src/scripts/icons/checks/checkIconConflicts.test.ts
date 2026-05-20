import { describe, expect, it } from 'bun:test';
import { findConflicts } from './checkIconConflicts';

describe('icon conflict validation', () => {
  it('should detect duplicate file extension assignments', () => {
    const conflicts = findConflicts([
      { name: 'typescript', definitions: ['ts'] },
      { name: 'javascript', definitions: ['js'] },
      { name: 'typescript-alt', definitions: ['ts'] },
    ]);

    expect(conflicts).toEqual({
      ts: ['typescript', 'typescript-alt'],
    });
  });

  it('should detect duplicate folder name assignments', () => {
    const conflicts = findConflicts([
      { name: 'folder-src', definitions: ['src'] },
      { name: 'folder-lib', definitions: ['lib'] },
      { name: 'folder-source', definitions: ['src'] },
    ]);

    expect(conflicts).toEqual({
      src: ['folder-src', 'folder-source'],
    });
  });

  it('should not flag icon pack overrides as conflicts', () => {
    const conflicts = findConflicts([
      { name: 'typescript', definitions: ['ts'] },
      {
        name: 'typescript-angular',
        definitions: ['ts'],
        enabledFor: ['angular'],
      },
    ]);

    expect(conflicts).toEqual({});
  });

  it('should handle three-way conflicts', () => {
    const conflicts = findConflicts([
      { name: 'typescript', definitions: ['ts'] },
      { name: 'typescript-alt', definitions: ['ts'] },
      { name: 'typescript-other', definitions: ['ts'] },
    ]);

    expect(conflicts).toEqual({
      ts: ['typescript', 'typescript-alt', 'typescript-other'],
    });
  });

  it('should return empty when no conflicts exist', () => {
    const conflicts = findConflicts([
      { name: 'typescript', definitions: ['ts'] },
      { name: 'javascript', definitions: ['js'] },
      { name: 'rust', definitions: ['rs'] },
    ]);

    expect(conflicts).toEqual({});
  });

  it('should handle icons with multiple definitions', () => {
    const conflicts = findConflicts([
      { name: 'typescript', definitions: ['ts', 'tsx'] },
      { name: 'typescript-alt', definitions: ['ts'] },
    ]);

    expect(conflicts).toEqual({
      ts: ['typescript', 'typescript-alt'],
    });
  });

  it('should be case-insensitive', () => {
    const conflicts = findConflicts([
      { name: 'docker', definitions: ['Dockerfile'] },
      { name: 'docker-alt', definitions: ['dockerfile'] },
    ]);

    expect(conflicts).toEqual({
      dockerfile: ['docker', 'docker-alt'],
    });
  });
});
