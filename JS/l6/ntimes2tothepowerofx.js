function puzzle(n, x) {
  return n * 2 ** x;
}
const puzzle2 = (n, x) => n * 2 ** x;
const puzzle3 = (n, x) => n << x;

function match(candidate, job) {
  // First, check if both the candidate and job objects have the required salary information.
  if (!candidate.minSalary || !job.maxSalary) {
    throw new Error(
      "Cannot perform salary match: candidate or job is missing salary information."
    );
  }
  const adjustedMinSalary = candidate.minSalary * 0.9;
  return adjustedMinSalary <= job.maxSalary;
}
