declare namespace Express {
  interface Request {
    userId: number;
  }
}

interface ExphbsOptions {
  handlebars?: any;
  extname?: string;
  layoutsDir?: string;
  partialsDir?: any;
  defaultLayout?: string;
  helpers?: any;
  compilerOptions?: any;
}

interface NodemailerHandlebarsOptions {
  viewPath: string;
  extName: string;
  viewEngine: ExphbsOptions
}

interface Exphbs {
  engine: (path: string, options: object, callback: (e: any, rendered: string) => void) => void;
  extname: string;
  compiled: Object;
  precompiled: Object;
  create(options?: ExphbsOptions): Exphbs;
  getPartials(options?: PartialTemplateOptions): Promise<Object>;
  getTemplate(filePath: string, options?: PartialTemplateOptions): Promise<Function>;
  getTemplates(dirPath: string, options?: PartialTemplateOptions): Promise<Object>;
  render(filePath: string, context: Object, options?: RenderOptions): Promise<string>;
  renderView(viewPath: string, callback: ExphbsCallback): void;
  renderView(viewPath: string, options: any, callback: ExphbsCallback): void;
}

interface NodemailerHandlebars {
  (options?: NodemailerHandlebarsOptions): (...args: any[]) => any;
  create (options?: ExphbsOptions): Exphbs;
}

declare module 'nodemailer-express-handlebars' {
  var nodemailerhbs: NodemailerHandlebars;

  export = nodemailerhbs;
}