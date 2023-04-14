import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useDisconnect,
  useAddress,
  useMetamask,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { currency } from "../constants";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

function GridMenu() {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const address = useAddress();
  const loginWithMetaMask = useMetamask();
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );
  const { data: isLotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );
  const { data: totalCommission } = useContractRead(
    contract,
    "operatorTotalCommission"
  );
  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    "WithdrawCommission"
  );
  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    "DrawWinnerTicket"
  );
  const { mutateAsync: restartDraw } = useContractWrite(
    contract,
    "restartDraw"
  );
  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");

  const disconnect = useDisconnect();
  useEffect(() => {
    fetchWalletBalance();
  }, [address, winnings]);

  const fetchWalletBalance = async () => {
    if (address) {
      provider.getBalance(address?.toString()).then((balance) => {
        const balanceInMatic = ethers.utils.formatEther(balance);
        setWalletBalance(Number(balanceInMatic));
      });
    } else {
      console.log("No account found");
    }
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings..");

    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winning withdraw successfully!", { id: notification });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  const onWithdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission..");

    try {
      const data = await WithdrawCommission([{}]);

      toast.success("Your commission has been withdrawn successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  const drawWinner = async () => {
    const notification = toast.loading("Picking a lucky winner..");

    try {
      const data = await DrawWinnerTicket([{}]);

      toast.success("A Winner has been selected!", { id: notification });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting draw..");

    try {
      const data = await restartDraw([{}]);

      toast.success("Draw restrted successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  const onRefundAll = async () => {
    const notification = toast.loading("Refunding all..");

    try {
      const data = await RefundAll([{}]);

      toast.success("All refunded successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full">
        {address ? (
          <div className="flex flex-col gap-2.5">
            <a
              href={`https://mumbai.polygonscan.com/address/${address}`}
              target="_blank"
            >
              <div className="flex justify-end gap-1 menu-item">
                {address?.substring(0, 5)}...
                {address?.substring(address.length, address.length - 5)}
                <ArrowUpRightIcon className=" h-4 my-auto" />
              </div>
            </a>
            {winnings > 0 && (
              <div
                className="cursor-pointer menu-item"
                onClick={onWithdrawWinnings}
              >
                Withdraw Rewards
              </div>
            )}
            {isLotteryOperator === address && (
              <>
                {totalCommission > 0 && (
                  <div
                    className="cursor-pointer menu-item"
                    onClick={onWithdrawCommission}
                  >
                    Withdraw Commission
                  </div>
                )}
                <div className="cursor-pointer menu-item" onClick={drawWinner}>
                  Draw Winner
                </div>
                <div
                  className="cursor-pointer menu-item"
                  onClick={onRestartDraw}
                >
                  Restart Draw
                </div>
                <div className="cursor-pointer menu-item" onClick={onRefundAll}>
                  Refund All
                </div>
              </>
            )}

            <div
              className="cursor-pointer menu-item"
              onClick={() => {
                disconnect();
                setWalletBalance(0);
              }}
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="menu-item cursor-pointer" onClick={loginWithMetaMask}>
            Connect Wallet
          </div>
        )}

        <div className="menu-item-balance">
          // Wallet Balance -{" "}
          {walletBalance > 0 ? walletBalance.toFixed(4) : "0.00"} {currency} //
          <br />
          {isLotteryOperator === address
            ? "// Commission - " +
              (totalCommission > 0
                ? ethers.utils.formatEther(totalCommission?.toString())
                : "0.00")
            : "// Rewards - " +
              (winnings > 0
                ? ethers.utils.formatEther(winnings?.toString())
                : "0.00")}{" "}
          {currency}
          {" //"}
        </div>
      </div>
    </div>
  );
}

export default GridMenu;
