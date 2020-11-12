export function log(req: any, res: any, next) {
  console.log('log function middleware');
  next();
}
