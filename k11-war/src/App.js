import React, { useState, Suspense, useMemo, useEffect } from "react";
import QueryProvider from "./api/QueryProvider";
import { SharedContextProvider, useSharedContext } from "./contexts/SharedContext";
import { 
  Button, 
  Card, 
  Alert, 
  Input, 
  Badge, 
  Avatar, 
  AvatarImage, 
  AvatarFallback,
  Separator,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  ToastProvider,
  useToast,
} from "./design-system/components";
import Navbar from "./components/Navbar";

// Error fallback component
const InboxErrorFallback = ({ error }) => (
  <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
    <Alert 
      variant="destructive" 
      className="max-w-[600px]"
      title="Failed to load Inbox module"
      description={
        <>
          <p className="mb-2">
            Please ensure k11-inbox is running on http://localhost:3001
          </p>
          <p className="mb-2">
            Start it with: <code className="bg-muted px-1 py-0.5 rounded">pnpm run start:inbox</code>
          </p>
          {error && (
            <p className="mt-2 font-mono text-xs">
              Error: {error.message}
            </p>
          )}
        </>
      }
    />
  </div>
);

const ToastExample = () => {
  const { addToast } = useToast();
  
  return (
    <div className="mt-4 flex gap-2 flex-wrap">
      <Button onClick={() => addToast({ title: "Success", description: "Operation completed successfully", variant: "success" })}>
        Success Toast
      </Button>
      <Button onClick={() => addToast({ title: "Error", description: "Something went wrong", variant: "destructive" })}>
        Error Toast
      </Button>
      <Button onClick={() => addToast({ title: "Info", description: "Here's some information" })}>
        Info Toast
      </Button>
    </div>
  );
};

const AppContent = () => {
  const [currentView, setCurrentView] = useState("home");
  const [inboxError, setInboxError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const { updateSharedData } = useSharedContext();

  useEffect(() => {
    updateSharedData({ navigation: { currentView } });
  }, [currentView, updateSharedData]);

  // Only load the remote module when inbox view is selected
  const InboxAppComponent = useMemo(() => {
    if (currentView !== "inbox") return null;
    
    return React.lazy(() => {
      return import("k11_inbox/App")
        .catch((error) => {
          setInboxError(error);
          // Return a component that shows the error
          return {
            default: () => <InboxErrorFallback error={error} />,
          };
        });
    });
  }, [currentView]);

  const HomeView = () => (
    <div className="min-h-[calc(100vh-64px)] bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-4">
            K11 WAR
          </h1>
          <h2 className="text-2xl font-medium mb-4">
            Main Application with Design System
          </h2>
          <p className="mt-4 opacity-90">
            This application hosts the design-system and exposes it via Module Federation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Button"
            description="Button component with multiple variants and sizes"
          >
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>

          <Card
            title="Input"
            description="Text input component with focus states"
          >
            <div className="mt-4 space-y-3">
              <Input type="text" placeholder="Enter your name" />
              <Input type="email" placeholder="Enter your email" />
              <Input type="password" placeholder="Enter password" />
              <Input type="text" placeholder="Disabled input" disabled />
            </div>
          </Card>

          <Card
            title="Badge"
            description="Badge component for labels and tags"
          >
            <div className="mt-4 flex gap-2 flex-wrap">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Card>

          <Card
            title="Avatar"
            description="Avatar component for user profiles"
          >
            <div className="mt-4 flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </Card>

          <Card
            title="Alert"
            description="Alert component for notifications and messages"
          >
            <div className="mt-4 space-y-3">
              <Alert title="Default Alert" description="This is a default alert message" />
              <Alert 
                variant="destructive" 
                title="Destructive Alert" 
                description="This is a destructive alert message" 
              />
            </div>
          </Card>

          <Card
            title="Separator"
            description="Visual separator component"
          >
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Horizontal separator</p>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">Content below separator</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Left</span>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-sm">Right</span>
              </div>
            </div>
          </Card>

          <Card
            title="Dialog"
            description="Modal dialog component"
          >
            <div className="mt-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger>Open Dialog</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => setDialogOpen(false)}>Delete</Button>
                  </DialogFooter>
                  <DialogClose />
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            title="Select"
            description="Dropdown select component"
          >
            <div className="mt-4">
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                </SelectContent>
              </Select>
              {selectValue && (
                <p className="mt-2 text-sm text-muted-foreground">Selected: {selectValue}</p>
              )}
            </div>
          </Card>

          <Card
            title="Drawer"
            description="Side drawer component"
          >
            <div className="mt-4">
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger>Open Drawer</DrawerTrigger>
                <DrawerContent side="right">
                  <DrawerHeader>
                    <DrawerTitle>Settings</DrawerTitle>
                    <DrawerDescription>Manage your account settings</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input className="mt-2" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input className="mt-2" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button onClick={() => setDrawerOpen(false)}>Save</Button>
                    <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                  </DrawerFooter>
                  <DrawerClose />
                </DrawerContent>
              </Drawer>
            </div>
          </Card>

          <Card
            title="Toast"
            description="Toast notification component"
          >
            <ToastExample />
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1">
        {currentView === "home" ? (
          <HomeView />
        ) : InboxAppComponent ? (
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }
          >
            <InboxAppComponent />
          </Suspense>
        ) : (
          <InboxErrorFallback />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryProvider>
      <SharedContextProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </SharedContextProvider>
    </QueryProvider>
  );
}

export default App;
