import * as React from "react";
import { createUseStyles } from "react-jss";

type TimeColumn = {
  start: number;
  end: number;
  setValue: (value: string) => void;
  value: string;
  exclude?: Array<number>;
  notShowExclude?: boolean;
};

const useStyles = createUseStyles({
  control: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  control__time: {
    cursor: "pointer",
    transition: "opacity 0.5s",
    "&:hover": {
      opacity: 0.5,
    },
    "*": {
      stroke: "var(--timeit-primary-color)",
    },
  },
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "128px",
    width: "64px",
    overflow: "hidden",
    userSelect: "none",
  },
  selector: {
    width: "100%",
    height: "40px",
    backgroundColor: "var(--timeit-primary-color)",
    position: "absolute",
    top: "39px",
    borderRadius: "8px",
  },
  timeWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "40px",
    fontSize: "20px",
    transition: "transform 0.5s",
    paddingTop: "40px",
  },
  time: {
    zIndex: "1",
    color: "var(--timeit-primary-color)",
    opacity: "0.5",
    transition: "color 0.5s",
  },
  selected: {
    color: "#fff",
    opacity: "1",
  },
  disabled: {
    opacity: "0.2 !important",
  },
});

const TimeColumn = ({ start, end, setValue, value, exclude, notShowExclude }: TimeColumn) => {
  const classes = useStyles();

  const [slecetorMove, setSlecetorMove] = React.useState<number>(+value ? +value : 0);

  const timeArray: (string | number)[] = [];
  for (let time = start; time <= end; time++) {
    if (notShowExclude) !exclude?.includes(time) && timeArray.push(time);
    else timeArray.push(time);
  }

  React.useEffect(() => {
    let prev = slecetorMove;
    if (exclude?.includes(prev)) {
      while (exclude?.includes(prev)) {
        prev = prev + 1;
        setSlecetorMove(prev);
      }
    }
  }, []);

  React.useEffect(() => {
    setValue(slecetorMove.toString().length === 1 ? `0${slecetorMove}` : slecetorMove.toString());
  }, [slecetorMove]);

  const controlBottom = () => {
    let prev = slecetorMove;
    if (prev !== end) {
      if (exclude?.includes(prev + 1)) {
        while (exclude?.includes(prev + 1)) {
          if (prev + 2 > end) {
            return setSlecetorMove(start);
          }
          prev = prev + 1;
          setSlecetorMove(prev + 1);
        }
      } else {
        return setSlecetorMove(prev + 1);
      }
    } else {
      return setSlecetorMove(start);
    }
  };

  const controlTop = () => {
    let prev = slecetorMove;
    if (prev !== start) {
      if (exclude?.includes(prev - 1)) {
        while (exclude?.includes(prev - 1)) {
          if (prev - 2 < start) {
            return setSlecetorMove(end);
          }
          prev = prev - 1;
          setSlecetorMove(prev - 1);
        }
      } else {
        return setSlecetorMove(prev - 1);
      }
    } else {
      let endnumber = end;
      if (exclude?.includes(end)) {
        while (exclude?.includes(endnumber - 1)) {
          endnumber = endnumber - 1;
          setSlecetorMove(endnumber - 1);
        }
      } else {
        return setSlecetorMove(end);
      }
    }
  };

  return (
    <div className={classes.control}>
      <div className={classes.control__time} onClick={controlTop}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.selector} />
        <div
          className={classes.timeWrapper}
          style={{
            transform: `translateY(-${slecetorMove && timeArray.indexOf(slecetorMove) * 40}px)`,
          }}
        >
          {timeArray.map((time) => (
            <div
              key={time}
              className={`${classes.time} ${+time === slecetorMove ? classes.selected : ""} ${
                exclude && exclude.includes(+time) ? classes.disabled : ""
              }`}
            >
              {time.toString().length === 1 ? `0${time}` : time}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.control__time} onClick={controlBottom}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default TimeColumn;
