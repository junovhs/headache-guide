// ============================================================================
// Remedy Selection
// ============================================================================

import type { Remedy, HeadacheCategory } from '../types';
import { remedies } from '../data';
import type { RankedCause } from './scoring';

export function getRemedies(primary: RankedCause, secondary: RankedCause[]): Remedy[] {
  const result: Remedy[] = [];
  const addedIds = new Set<string>();

  addPrimaryRemedies(result, addedIds, primary.category);
  addSecondaryRemedies(result, addedIds, secondary);
  addFallbackRemedies(result, addedIds);

  return result;
}

function addPrimaryRemedies(
  result: Remedy[],
  addedIds: Set<string>,
  category: HeadacheCategory
): void {
  const primaryRemedies = remedies[category] || [];
  for (const remedy of primaryRemedies) {
    if (!addedIds.has(remedy.id)) {
      result.push(remedy);
      addedIds.add(remedy.id);
    }
  }
}

function addSecondaryRemedies(
  result: Remedy[],
  addedIds: Set<string>,
  secondary: RankedCause[]
): void {
  for (const sec of secondary) {
    const secRemedies = remedies[sec.category] || [];
    for (const remedy of secRemedies) {
      if (!addedIds.has(remedy.id) && remedy.category === 'immediate') {
        result.push(remedy);
        addedIds.add(remedy.id);
      }
    }
  }
}

function addFallbackRemedies(result: Remedy[], addedIds: Set<string>): void {
  if (result.length > 0) return;

  const unknownRemedies = remedies.unknown || [];
  for (const remedy of unknownRemedies) {
    if (!addedIds.has(remedy.id)) {
      result.push(remedy);
      addedIds.add(remedy.id);
    }
  }
}
