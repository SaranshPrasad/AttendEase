import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QrCode, UserPlus, Plus, BarChart3 } from "lucide-react";

export default function QuickActions({ actions, title }) {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold">
          {title || "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Link key={action.title} to={action.url}>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} mr-3`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
