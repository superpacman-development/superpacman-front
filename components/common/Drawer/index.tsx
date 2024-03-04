'use client';

import { useElementSizeAsCssVariables } from '@/hooks/useElementSizeAsCssVariables';
import { cn } from '@/utils/cn';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';
// const Root = Popover.Root;
// const Trigger = Popover.Trigger;
// const Portal = Popover.Portal;

// const Content = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
//   const ref = useElementSizeAsCssVariables<HTMLDivElement>({
//     widthVariableName: '--drawer-content-width',
//   });

//   return (
//     <div
//       className={cn('animate-drawerOpen fixed inset-y-[0] right-[0] w-[30vw] bg-white', className)}
//       style={{ boxShadow: '-4px 0px 12px rgba(0, 0, 0, 0.25)' }}
//       ref={ref}
//     >
//       {children}
//     </div>
//   );
// };

// export const Drawer = {
//   Root,
//   Trigger,
//   Portal,
//   Content,
// };

import { Drawer as DrawerComponent } from 'vaul';

export const Drawer = {
  ...DrawerComponent,
  Root: ({ direction = 'right', ...props }: ComponentPropsWithRef<typeof DrawerComponent.Root>) => (
    <DrawerComponent.Root direction={direction} {...props} />
  ),
  Overlay: (props: ComponentPropsWithRef<typeof DrawerComponent.Overlay>) => (
    <DrawerComponent.Overlay {...props} className={cn('fixed inset-[0]', props.className)} />
  ),
  Content: (props: ComponentPropsWithRef<typeof DrawerComponent.Content>) => {
    const ref = useElementSizeAsCssVariables<HTMLDivElement>({
      widthVariableName: '--drawer-content-width',
    });

    return (
      <DrawerComponent.Content
        {...props}
        ref={ref}
        className={cn('fixed bottom-[0] right-[0] top-[0] h-full w-[30%] overflow-x-hidden bg-white', props.className)}
        style={{ boxShadow: '-4px 0px 12px rgba(0, 0, 0, 0.25)' }}
      />
    );
  },
  Container: ({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <div className={cn('mt-24 flex flex-col px-26 py-30', className)}>{children}</div>
  ),
};
