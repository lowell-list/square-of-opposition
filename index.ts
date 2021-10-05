import * as readline from "readline"

/**
 * Setup
 * -----------------------------------------------------------------------------
 */

/**
 * Setup interface to read from stdin.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * Default statement values
 */
const defaultStatement: Statement = {
  subject: "S",
  positiveVerb: "are",
  negativeVerb: "are not",
  predicate: "P",
  A: "unknown",
  E: "unknown",
  I: "unknown",
  O: "unknown",
}

/**
 * Types
 * -----------------------------------------------------------------------------
 */

type StatementValue = true | false | "unknown"

interface Statement {
  readonly subject: string
  readonly positiveVerb: string
  readonly negativeVerb: string
  readonly predicate: string
  readonly A: StatementValue
  readonly E: StatementValue
  readonly I: StatementValue
  readonly O: StatementValue
}

/**
 * Main function
 * -----------------------------------------------------------------------------
 */
async function main() {
  /**
   * Collect statement data.
   */
  const subject = (await question("Enter Subject (S): ")) as string
  const positiveVerb = (await question("Enter Positive Verb: ")) as string
  const negativeVerb = (await question("Enter Negative Verb: ")) as string
  const predicate = (await question("Enter Predicate (P): ")) as string
  const statementType = (await question(
    "Enter Statement Type (A, E, I or O): "
  )) as string
  const statementValue = (await question("Statement true? (Y/N): ")) as string

  /**
   * Create statement object.
   */
  const valueOf = (typeLetter: string): StatementValue =>
    statementType === typeLetter ? statementValue === "Y" : "unknown"
  const statement = {
    subject,
    positiveVerb,
    negativeVerb,
    predicate,
    A: valueOf("A"),
    E: valueOf("E"),
    I: valueOf("I"),
    O: valueOf("O"),
  }

  /** Calculate statement values. */
  console.log("Start Statement:", statement)
  const solvedStatement = solveStatementOnePass(statement)
  console.log("Solved Statement:", solvedStatement)

  /** Output English statements. */
  logStatements(solvedStatement)
}

/**
 * Utility functions
 * -----------------------------------------------------------------------------
 */

/**
 * Read text from the keyboard (stdin) with "question" prompt text
 * and return the answer text string.
 */
function question(text: string) {
  return new Promise((resolve, reject) => {
    rl.question(text, (input) => resolve(input))
  })
}

/**
 * Given current statement values, calculate and return a statement with
 * new A, E, I, and O values.
 */
function solveStatementOnePass(statement: Statement): Statement {
  return {
    ...statement,
    A: calculateA(statement),
    E: calculateE(statement),
    I: calculateI(statement),
    O: calculateO(statement),
  }
}

/**
 * Given a statement, calculate the A value.
 */
function calculateA(statement: Statement): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(statement.A)) {
    return statement.A
  }
  // Contradiction (diagonal)
  if (isKnown(statement.O)) {
    return !statement.O
  }
  // Contrariety (top horizontal)
  if (statement.E === true) {
    return false
  }
  // Superimplication (left vertical)
  if (statement.I === false) {
    return false
  }
  return "unknown"
}

function calculateE(statement: Statement): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(statement.E)) {
    return statement.E
  }
  // Contradiction (diagonal)
  if (isKnown(statement.I)) {
    return !statement.I
  }
  // Contrariety (top horizontal)
  if (statement.A === true) {
    return false
  }
  // Superimplication (right vertical)
  if (statement.O === false) {
    return false
  }
  return "unknown"
}

function calculateI(statement: Statement): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(statement.I)) {
    return statement.I
  }
  // Contradiction (diagonal)
  if (isKnown(statement.E)) {
    return !statement.E
  }
  // Subcontrariety (bottom horizontal)
  if (statement.O === false) {
    return true
  }
  // Subimplication (left vertical)
  if (statement.A === true) {
    return true
  }
  return "unknown"
}

function calculateO(statement: Statement): StatementValue {
  // Value is already known: nothing to calculate
  if (isKnown(statement.O)) {
    return statement.O
  }
  // Contradiction (diagonal)
  if (isKnown(statement.A)) {
    return !statement.A
  }
  // Subcontrariety (bottom horizontal)
  if (statement.I === false) {
    return true
  }
  // Subimplication (right vertical)
  if (statement.E === true) {
    return true
  }
  return "unknown"
}

/**
 * Output all complete statements in English: A, E, I, and O.
 */
function logStatements(statement: Statement) {
  const { subject, positiveVerb, negativeVerb, predicate, A, E, I, O } =
    statement
  console.log(`A All ${subject} ${positiveVerb} ${predicate}: ${A}`)
  console.log(`E No ${subject} ${positiveVerb} ${predicate}: ${E}`)
  console.log(`I Some ${subject} ${positiveVerb} ${predicate}: ${I}`)
  console.log(`O Some ${subject} ${negativeVerb} ${predicate}: ${O}`)
}

/**
 * If the value is NOT unknown, return true.
 */
function isKnown(statementValue: StatementValue) {
  return statementValue !== "unknown"
}

/**
 * Run Main
 * -----------------------------------------------------------------------------
 */
main()
  .catch((err) => {
    console.log("an error occurred: " + err)
  })
  .then(() => {
    rl.close()
  })
