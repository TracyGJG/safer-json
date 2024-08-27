export function parseJson(jsonString, reviver) {
  try {
    return { data: JSON.parse(jsonString, reviver) };
  } catch (error) {
    return { error: error.message };
  }
}

export function stringifyJson(jsonObject, replacer, spaces) {
  try {
    return { data: JSON.stringify(jsonObject, replacer, spaces) };
  } catch (error) {
    return { error: error.message };
  }
}
