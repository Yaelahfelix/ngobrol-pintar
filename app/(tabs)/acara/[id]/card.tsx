import { Card, CardBody } from "@heroui/react";
import React from "react";

type Props = {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const DetailCard = ({ className = "", title, description, icon }: Props) => {
  return (
    <Card
      className={`shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${className}`}
    >
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
