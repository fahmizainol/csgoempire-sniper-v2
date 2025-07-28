import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { CustomSidebar } from "@/components/CustomSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";

export default function CustomLayout() {
  const defaultOpen = true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <CustomSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button className="justify-end">
            <Grid></Grid>
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
