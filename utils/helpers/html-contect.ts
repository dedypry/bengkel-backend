import { join } from 'path';
import { Edge } from 'edge.js';

export async function getHtmlContent(
  templateName: string,
  data: Record<string, any>,
) {
  const edge = Edge.create();
  const filePath = join(process.cwd(), 'assets/templates/pdf');
  edge.mount(filePath);
  const html = await edge.render(templateName, data);

  return html;
}
