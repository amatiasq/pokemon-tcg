export function formToJson(form: HTMLFormElement) {
  const formData = new FormData(form);
  const json: Record<string, string> = {};

  for (const [key, value] of formData) {
    json[key] = `${value}`;
  }

  return json;
}
