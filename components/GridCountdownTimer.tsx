import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Countdown from "react-countdown";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

function GridCountdownTimer() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: expiration, isLoading: isLoadingExpiration } = useContractRead(
    contract,
    "expiration"
  );
  const renderer = ({ hours, minutes, seconds, completed }: Props) => {
    if (completed) {
      return (
        <div className="flex flex-col items-center h-full">
          <h2 className="card-title">No Draw for Now</h2>
          <div className="flex space-x-6 flex-1 items-center">
            <div className="flex-1">
              <div className="flex">
                <div className="countdown-value">00</div>
                <div className="countdown-message">
                  <div className="-rotate-90 text-white/70 mb-0.5">minutes</div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex">
                <div className="countdown-value">00</div>
                <div className="countdown-message">
                  <div className="-rotate-90 text-white/70 mb-0.5">seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center h-full">
          <h2 className="card-title">Draw Ends in</h2>
          <div className="flex space-x-6 flex-1 items-center">
            <div className="flex-1">
              <div className="flex">
                <div className="countdown-value">{minutes ? minutes : "00"}</div>
                <div className="countdown-message">
                  <div className="-rotate-90 text-white/70 mb-0.5">minutes</div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex">
                <div className="countdown-value">{seconds ? seconds : "00"}</div>
                <div className="countdown-message">
                  <div className="-rotate-90 text-white/70 mb-0.5">seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full">
      <Countdown date={new Date(expiration * 1000)} renderer={renderer} />
    </div>
  );
}

export default GridCountdownTimer;
