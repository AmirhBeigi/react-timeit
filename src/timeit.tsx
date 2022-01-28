import * as React from "react";
import TimeColumn from "./atom/timeColumn";
import { createUseStyles } from "react-jss";

type TimeitProps = {
  onChange?: (value: string) => any;
  defualtValue?: string;
  minuteExclude?: Array<number>;
  hourExclude?: Array<number>;
  notShowExclude?: boolean;
};

const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    direction: "ltr",
    "&>*": {
      margin: "0 5px",
    },
    "&>:last-child": {
      marginRight: "0",
    },
    "&>:first-child": {
      marginLeft: "0",
    },
  },
});

const Timeit = ({
  onChange,
  defualtValue,
  minuteExclude,
  hourExclude,
  notShowExclude,
}: TimeitProps) => {
  const classes = useStyles();

  const [hour, setHour] = React.useState(defualtValue ? defualtValue.split(":")[0] : "00");
  const [minute, setMinute] = React.useState(defualtValue ? defualtValue.split(":")[1] : "00");

  React.useEffect(() => {
    onChange && onChange(`${hour}:${minute}`);
  }, [hour, minute]);

  return (
    <div className={classes.wrapper}>
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={23}
        value={hour}
        setValue={setHour}
        exclude={hourExclude}
      />
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={59}
        value={minute}
        setValue={setMinute}
        exclude={minuteExclude}
      />
    </div>
  );
};

export default Timeit;
