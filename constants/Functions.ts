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