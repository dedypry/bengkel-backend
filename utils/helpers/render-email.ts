import { join } from 'path';
import { Edge } from 'edge.js';

let edgeInstance: Edge | null = null;

function getEdge() {
  if (!edgeInstance) {
    edgeInstance = new Edge();
    edgeInstance.mount(join(process.cwd(), 'assets/templates/emails'));
  }

  return edgeInstance;
}

export async function renderEmailTemplate(
  templateName: string,
  data: Record<string, unknown>,
) {
  return getEdge().render(templateName, data);
}
