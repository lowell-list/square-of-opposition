/**
 * Types
 * -----------------------------------------------------------------------------
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Utility functions
 * -----------------------------------------------------------------------------
 */
/**
 * Given current statement values, calculate and return new statement values.
 */
function solveStatementOnePass(values) {
    return __assign(__assign({}, values), { A: calculateA(values), E: calculateE(values), I: calculateI(values), O: calculateO(values) });
}
/**
 * If the value is NOT unknown, return true.
 */
function isKnown(value) {
    return value !== "unknown";
}
/**
 * Given statement values, calculate the A value.
 */
function calculateA(value) {
    // Value is already known: nothing to calculate
    if (isKnown(value.A)) {
        return value.A;
    }
    // Contradiction (diagonal)
    if (isKnown(value.O)) {
        return !value.O;
    }
    // Contrariety (top horizontal)
    if (value.E === true) {
        return false;
    }
    // Superimplication (left vertical)
    if (value.I === false) {
        return false;
    }
    return "unknown";
}
function calculateE(value) {
    // Value is already known: nothing to calculate
    if (isKnown(value.E)) {
        return value.E;
    }
    // Contradiction (diagonal)
    if (isKnown(value.I)) {
        return !value.I;
    }
    // Contrariety (top horizontal)
    if (value.A === true) {
        return false;
    }
    // Superimplication (right vertical)
    if (value.O === false) {
        return false;
    }
    return "unknown";
}
function calculateI(value) {
    // Value is already known: nothing to calculate
    if (isKnown(value.I)) {
        return value.I;
    }
    // Contradiction (diagonal)
    if (isKnown(value.E)) {
        return !value.E;
    }
    // Subcontrariety (bottom horizontal)
    if (value.O === false) {
        return true;
    }
    // Subimplication (left vertical)
    if (value.A === true) {
        return true;
    }
    return "unknown";
}
function calculateO(value) {
    // Value is already known: nothing to calculate
    if (isKnown(value.O)) {
        return value.O;
    }
    // Contradiction (diagonal)
    if (isKnown(value.A)) {
        return !value.A;
    }
    // Subcontrariety (bottom horizontal)
    if (value.I === false) {
        return true;
    }
    // Subimplication (right vertical)
    if (value.E === true) {
        return true;
    }
    return "unknown";
}
