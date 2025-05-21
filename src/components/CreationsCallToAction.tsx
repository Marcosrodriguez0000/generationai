
import React from 'react';
import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreationsCallToActionProps {
  count: number;
}

const CreationsCallToAction = ({ count }: CreationsCallToActionProps) => {
  if (count === 0) return null;

  return (
    <div className="text-center mb-16">
      <Link to="/creaciones">
        <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
          <Images className="h-4 w-4 mr-2" />
          Ver mis creaciones ({count})
        </Button>
      </Link>
    </div>
  );
};

export default CreationsCallToAction;
