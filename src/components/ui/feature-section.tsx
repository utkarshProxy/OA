"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Bell,
  DollarSign,
  Users,
  Share2,
  FileBarChart,
} from "lucide-react";

const tasks = [
  {
    title: "AI-powered notifications",
    subtitle: "Smart alerts for critical events",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Automated payroll",
    subtitle: "Error-free salary processing",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Employee insights",
    subtitle: "Track productivity in real-time",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Social campaigns",
    subtitle: "AI-curated content suggestions",
    icon: <Share2 className="h-5 w-5" />,
  },
  {
    title: "AI-driven reports",
    subtitle: "Weekly insights & performance",
    icon: <FileBarChart className="h-5 w-5" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="flex items-center justify-center bg-background px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* LEFT SIDE - Task Loop with Vertical Bar */}
        <div className="flex items-stretch gap-4">
          <div className="w-1 rounded-full bg-border" />

          <Card className="relative w-full overflow-hidden">
            <CardContent className="p-0">
              {/* Scrollable Container */}
              <div className="relative h-[320px] overflow-hidden">
                {/* Motion list */}
                <motion.div
                  className="flex flex-col gap-3 p-6"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                >
                  {[...tasks, ...tasks].map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border bg-card p-4"
                    >
                      {/* Icon + Content */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          {task.icon}
                        </div>

                        <div>
                          <p className="font-semibold text-foreground">
                            {task.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {task.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Fade effect only inside card */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-card to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE - Content */}
        <div>
          <Badge variant="secondary" className="mb-4">
            Workflow Automation
          </Badge>

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Automate repetitive tasks
          </h2>

          <p className="mb-6 text-lg text-muted-foreground">
            We help you streamline operations with AI-driven automation — from
            payroll and reporting to employee tracking and smart notifications.
            Our solutions reduce human error, save time, and scale effortlessly
            with your business needs.
          </p>

          <div className="flex flex-wrap gap-3">
            <Badge variant="outline">AI Task Bots</Badge>
            <Badge variant="outline">100+ Automations</Badge>
            <Badge variant="outline">Enterprise Ready</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
