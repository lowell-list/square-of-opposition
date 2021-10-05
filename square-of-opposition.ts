/**
 * Types
 * -----------------------------------------------------------------------------
 */

type StatementValue = true | false | "unknown"

interface StatementValues {
  readonly A: StatementValue
  readonly E: StatementValue
  readonly I: StatementValue
  readonly O: StatementValue
}

/**
 * Utility functions
 * -----------------------------------------------------------------------------
 */

/**
 * Given current statement values, calculate and return new statement values.
 */
function solveStatementOnePass(values: StatementValues): StatementValues {
  return {
    ...values,
    A: calculateA(values),
    E: calculateE(values),
    I: calculateI(values),
    O: calculateO(values),
  }
}

/**
 * If the value is NOT unknown, return true.
 */
function isKnown(value: StatementValue) {
  return value !== "unknown"
}

/**
 * Given statement values, calculate the A value.
 */
function calculateA(value: StatementValues): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(value.A)) {
    return value.A
  }
  // Contradiction (diagonal)
  if (isKnown(value.O)) {
    return !value.O
  }
  // Contrariety (top horizontal)
  if (value.E === true) {
    return false
  }
  // Superimplication (left vertical)
  if (value.I === false) {
    return false
  }
  return "unknown"
}

function calculateE(value: StatementValues): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(value.E)) {
    return value.E
  }
  // Contradiction (diagonal)
  if (isKnown(value.I)) {
    return !value.I
  }
  // Contrariety (top horizontal)
  if (value.A === true) {
    return false
  }
  // Superimplication (right vertical)
  if (value.O === false) {
    return false
  }
  return "unknown"
}

function calculateI(value: StatementValues): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(value.I)) {
    return value.I
  }
  // Contradiction (diagonal)
  if (isKnown(value.E)) {
    return !value.E
  }
  // Subcontrariety (bottom horizontal)
  if (value.O === false) {
    return true
  }
  // Subimplication (left vertical)
  if (value.A === true) {
    return true
  }
  return "unknown"
}

function calculateO(value: StatementValues): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(value.O)) {
    return value.O
  }
  // Contradiction (diagonal)
  if (isKnown(value.A)) {
    return !value.A
  }
  // Subcontrariety (bottom horizontal)
  if (value.I === false) {
    return true
  }
  // Subimplication (right vertical)
  if (value.E === true) {
    return true
  }
  return "unknown"
}
