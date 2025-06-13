import React from "react";
import { Avatar, Card, CardBody, CardFooter } from "@heroui/react";

type Props = { title: string; job: string; author: string; img: string };

const CardTestimoni = ({ title, job, author, img }: Props) => {
  return (
    <Card className="bg-slate-50 shadow rounded-lg w=full lg:w-4/12 p-7 hover:scale-110 hover:bg-blue-100 transition-all">
      <CardBody className="leading-7">{title}</CardBody>
      <CardFooter className="mt-5 gap-5">
        <Avatar src={img} />
        <div>
          <h6 className="font-bold">{author}</h6>
          <p className="text-xs">{job}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardTestimoni;
