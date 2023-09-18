export function validateCategory(category) {
    if (category.description.length < 3) {
      return "A descrição deve ter ao minimo 3 caracteres!"
    }
  
    return false
  }