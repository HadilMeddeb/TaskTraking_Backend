
export const checkBirth=(value:Date) => {
    if (value <= new Date()) {
      return false
    }
    return true;
  }