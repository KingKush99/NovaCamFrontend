/**
 * Fuzzy string matching for game answers
 * Handles case insensitivity, whitespace normalization, and minor typos
 */

export function normalizeString(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/[^\w\s]/g, ''); // Remove special characters
}

export function fuzzyMatch(input: string, answer: string, threshold: number = 0.85): boolean {
    const normalizedInput = normalizeString(input);
    const normalizedAnswer = normalizeString(answer);

    // Exact match
    if (normalizedInput === normalizedAnswer) {
        return true;
    }

    // Calculate similarity using Levenshtein distance
    const similarity = calculateSimilarity(normalizedInput, normalizedAnswer);
    return similarity >= threshold;
}

function calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) {
        return 1.0;
    }

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

export function checkMultipleAnswers(input: string, answers: string[]): boolean {
    return answers.some(answer => fuzzyMatch(input, answer));
}
