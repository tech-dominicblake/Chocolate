export function checkTurn(currentTurn: string, id: number) {
    if (currentTurn === "her") {
      if (id > 6) return false;
      if (id < 1) return true;
    } else if (currentTurn === "him") {
      if (id < 6) return false;
      if (id > 6) return true;
    }
    return undefined; // fallback if no condition matched
  }

  export function herChocoLevel(n: number) {
    if (!Number.isInteger(n) || n < 1 || n > 12) {
      throw new Error("Input must be an integer between 1 and 12");
    }
    return Math.min(6, (n + 2) >> 1); 
  }
  
  // quick check
  for (let i = 1; i <= 12; i++) {
  }

  export function himChocoLevel(n: number) {
    if (!Number.isInteger(n) || n < 1 || n > 12) {
      throw new Error("Input must be an integer between 1 and 12");
    }
    return (n + 1) >> 1; 
  }
  
  // quick check
  for (let i = 1; i <= 12; i++) {
  }