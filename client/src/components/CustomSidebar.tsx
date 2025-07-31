import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
  ],
};

function onSubmit(data: any) {
  console.log(data);
}

export function CustomSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const form = useForm({
    defaultValues: {
      priceRange: [0, 1000],
      minPrice: 0,
      maxPrice: 1000,
    },
  });

  const watchPriceRange = form.watch("priceRange");
  const watchMinPrice = form.watch("minPrice");
  const watchMaxPrice = form.watch("maxPrice");

  // Update slider when min/max inputs change
  React.useEffect(() => {
    form.setValue("priceRange", [watchMinPrice, watchMaxPrice]);
  }, [watchMinPrice, watchMaxPrice, form]);

  // Update min/max inputs when slider changes
  React.useEffect(() => {
    if (watchPriceRange && watchPriceRange.length === 2) {
      form.setValue("minPrice", watchPriceRange[0]);
      form.setValue("maxPrice", watchPriceRange[1]);
    }
  }, [watchPriceRange, form]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))} */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Filters</span>
                  <span className="">v1.0.0</span>
                </div>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Range</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={1000}
                              step={10}
                              value={field.value}
                              onValueChange={field.onChange}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="minPrice"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Min Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                max={1000}
                                placeholder="0"
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0;
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxPrice"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Max Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                max={1000}
                                placeholder="1000"
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0;
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
