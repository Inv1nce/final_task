import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function HasUserVoted({ pollId }: { pollId: bigint }) {
  const [userAddress, setUserAddress] = useState<string>("");

  const { data: hasVoted } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "hasUserVoted",
    args: [pollId, userAddress],
  });

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [isConnected, address]);

  if (hasVoted === undefined) return <p className="text-center text-gray-500">Загрузка...</p>;

  return (
    <div className="p-5 bg-indigo-700 text-white rounded-lg shadow-md max-w-md mx-auto">
      {hasVoted ? (
        <p className="text-lg font-medium">Вы уже проголосовали в этом голосовании.</p>
      ) : (
        <p className="text-lg font-medium">Вы ещё не проголосовали в этом голосовании.</p>
      )}
    </div>
  );
}
