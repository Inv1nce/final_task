import EndPoll from "~~/components/EndPoll";
import HasUserVoted from "~~/components/HasUserVoted";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function PollList() {
  const { data: pollCount } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollCount",
  });

  const renderPolls = () => {
    if (!pollCount) return <p className="text-center text-gray-500">Загрузка...</p>;
    const polls = [];
    for (let i = 0; i < pollCount; i++) {
      polls.push(<PollItem key={i} pollId={BigInt(i)} />);
    }
    return polls;
  };

  return (
    <div className="p-8 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-2xl shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Список голосований</h2>
      {pollCount && pollCount > 0 ? renderPolls() : <p className="text-lg">Нет активных голосований</p>}
    </div>
  );
}

function PollItem({ pollId }: { pollId: bigint }) {
  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollDetails",
    args: [BigInt(pollId)],
  });

  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  if (!data) return <p className="text-center text-gray-500">Загрузка...</p>;

  const [question, options, , isActive] = data;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{question}</h3>
      <ul className="space-y-3">
        {options.map((opt: string, idx: number) => (
          <li key={idx} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{opt}</span>
            {isActive && (
              <button
                onClick={() =>
                  writeContractAsync({
                    functionName: "vote",
                    args: [BigInt(pollId), BigInt(idx)],
                  })
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Голосовать
              </button>
            )}
          </li>
        ))}
      </ul>
      {!isActive && <p className="text-red-500 font-medium">Голосование завершено</p>}
      {isActive && <EndPoll pollId={pollId} />}
      <HasUserVoted pollId={pollId} />
    </div>
  );
}
