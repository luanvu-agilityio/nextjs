export const useRouter = () => ({
  push: (...args: unknown[]) => console.log('useRouter.push', args),
  replace: (...args: unknown[]) => console.log('useRouter.replace', args),
  prefetch: (...args: unknown[]) => console.log('useRouter.prefetch', args),
  back: () => console.log('useRouter.back'),
  forward: () => console.log('useRouter.forward'),
  refresh: () => console.log('useRouter.refresh'),
  pathname: '/',
  query: {},
  asPath: '/',
});

export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const redirect = (url: string) => console.log('redirect', url);
export const notFound = () => console.log('notFound');
