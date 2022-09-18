export const deco2style = (str: string) => {
  switch (str) {
    case "*": {
      return "font-bold";
    }
    case "**": {
      return "text-[1.2em] leading-[28px]";
    }
    case "***": {
      return "text-[1.44em] leading-[35px]";
    }
    case "****": {
      return "text-[1.73em] leading-[42px]";
    }
    case "*****": {
      return "text-[2.07em] leading-[49px]";
    }
    case "******": {
      return "text-[2.49em] leading-[56px]";
    }
    case "*******": {
      return "text-[3em] leading-[63px]";
    }
    case "********": {
      return "text-[3.58em] leading-[77px]";
    }
    case "*********": {
      return "text-[4.3em] leading-[91px]";
    }
    case "**********": {
      return "text-[5.16em] leading-[105px]";
    }
  }
  return "";
};
