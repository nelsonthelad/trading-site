import React, { createContext, useContext } from 'react';

const SidebarContext = createContext({});

const SidebarProvider = ({ children, ...props }) => {
  return (
    <SidebarContext.Provider value={{}}>
      <div {...props}>{children}</div>
    </SidebarContext.Provider>
  );
};

const Sidebar = React.forwardRef(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-full w-64 flex-col bg-gray-800 border-r border-gray-700 ${className}`}
    {...props}
  />
));
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`flex flex-col ${className}`} {...props} />
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`flex-1 overflow-auto ${className}`} {...props} />
));
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`flex flex-col ${className}`} {...props} />
));
SidebarFooter.displayName = 'SidebarFooter';

const SidebarGroup = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`px-3 py-2 ${className}`} {...props} />
));
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`text-xs font-medium text-gray-400 uppercase tracking-wider px-2 py-2 ${className}`} {...props} />
));
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarGroupContent = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`${className}`} {...props} />
));
SidebarGroupContent.displayName = 'SidebarGroupContent';

const SidebarMenu = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1 ${className}`} {...props} />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`${className}`} {...props} />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef(({ asChild = false, className = '', children, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : 'button';
  return (
    <Comp
      ref={ref}
      className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-700 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarTrigger = React.forwardRef(({ className = '', ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-700 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
));
SidebarTrigger.displayName = 'SidebarTrigger';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
};
