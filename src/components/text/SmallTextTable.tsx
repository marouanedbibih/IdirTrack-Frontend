import { Typography } from "@material-tailwind/react";

interface SmallTextTableProps {
  text: string;
}
export const SmallTextTable: React.FC<SmallTextTableProps> = ({ text }) => {
  return (
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {text}
    </Typography>
  );
};
