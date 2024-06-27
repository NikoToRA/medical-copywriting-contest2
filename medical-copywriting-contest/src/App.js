import React, { useState, useEffect, useCallback } from 'react';

const copywritingEntries = [
  "はまる！24時間どこでも書ける・稼げる医療ライター",
  "300名の多様な仲間と、共に学び、成長し、月収100万円を目指せる場所！\n医療従事者も、そうでない人も、大歓迎！",
  "医療の専門知識を活かして、今すぐ副業を始めよう！\nサロン入会初月から収入が期待できます。",
  "あなたの学会スライドが価値に変わる！\n医師多数の執筆ギルドで副業を始めよう",
  "WEBマガジン・講演・SNSなどでスキルup!\nあなたの「やりたい！」がここにある！\n塾生はほぼ初心者スタート！",
  "病院ではなく、お家で稼ぎたいそこのアナタ♡\nあなたの経験がお金になる！在宅ワークでサクッと稼いで月5万円からの副業収入を♪",
  "「あ」んてい収入！\n「ざ」んぎょうなし！\n「ら」いティングの力で\n「し」ん世界の扉を開こう！",
  "正しい医療知識を広めてライティング実績を上げる！\nどこに出しても恥ずかしくないポートフォリオを築くライティング塾です。",
  "信頼性の高いコンテンツ\nライティング技術の会得\n\nあなたの執筆が医療業界を変える\nココロおどる体験を　アザラシで",
  "副業で医師の月収を超えるのも夢ではありません！",
  "1.副業の扉を開いてみませんか？\n2.あなたの知識がお金を生む\n3.あなたの知識を、社会のために",
  "医師じゃなくても、月5万円以上稼げる\n医療職種のためのライティングコミュニティ",
  "今まで学んだ知識で社会貢献し、せっかくならお金に換算しませんか？",
  "・正しい医療の知識\n・豊富な案件でライターとしての自信と実績\n・文字単価10円への道筋\n\nこれ、全て手に入ります。",
  "あなたの経験がお金になる！在宅ワークでサクッと稼いで月5万からの副業収入を♪"
];

const colors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
  '#FF9F40', '#F29E4C', '#1C7C54', '#577590', '#F94144', 
  '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B'
];

const VotingForm = () => {
  const [voteCounts, setVoteCounts] = useState({});
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [voteHistory, setVoteHistory] = useState([]);
  const [voterName, setVoterName] = useState('');
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    const initialVoteCounts = copywritingEntries.reduce((acc, entry) => ({ ...acc, [entry]: 0 }), {});
    setVoteCounts(initialVoteCounts);
    setVoteHistory([initialVoteCounts]);
    const timer = setTimeout(() => setShowGraph(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelection = useCallback((entry) => {
    setSelectedEntries(prev => {
      if (prev.includes(entry)) {
        return prev.filter(e => e !== entry);
      } else if (prev.length < 3) {
        return [...prev, entry];
      }
      return prev;
    });
  }, []);

  const handleVote = useCallback(() => {
    if (selectedEntries.length !== 3) {
      setError('3つのエントリーを選択してください。');
      return;
    }
    if (!voterName.trim()) {
      setError('名前を入力してください。');
      return;
    }
    if (voters.includes(voterName)) {
      setError('すでに投票済みです。');
      return;
    }

    setVoteCounts(prev => {
      const newCounts = { ...prev };
      selectedEntries.forEach(entry => {
        newCounts[entry] = (newCounts[entry] || 0) + 1;
      });
      setVoteHistory(hist => [...hist, newCounts]);
      return newCounts;
    });
    setSelectedEntries([]);
    setVoters(prev => [...prev, voterName]);
    setVoterName('');
    setError('');
  }, [selectedEntries, voterName, voters]);

  const sortedEntries = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">医療コピーライティングコンテスト</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          placeholder="あなたの名前を入力してください"
          className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="voting-section bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">お気に入りのコピーを3つ選んでください</h2>
          <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-4">
            {copywritingEntries.map((entry, index) => (
              <button
                key={index}
                onClick={() => handleSelection(entry)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedEntries.includes(entry)
                    ? 'bg-indigo-100 border-indigo-500 border-2 shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="font-bold mr-2 text-indigo-600">{index + 1}.</span>
                <span className="whitespace-pre-wrap">{entry}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleVote}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold text-lg"
          >
            投票する ({selectedEntries.length}/3)
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>

        <div className="ranking-section bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">現在のランキング</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
            {sortedEntries.map(([entry, count], index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg" style={{color: colors[index]}}>
                    {index === 0 && '👑 '}
                    {index + 1}位
                  </span>
                  <span className="font-semibold text-indigo-600">{count} 票</span>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{entry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-black p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">ランキング推移</h2>
        <div className="relative" style={{ height: '400px' }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 400">
            <line x1="50" y1="350" x2="950" y2="350" stroke="#4B5563" strokeWidth="2" />
            <line x1="50" y1="50" x2="50" y2="350" stroke="#4B5563" strokeWidth="2" />
            
            {Array.from({ length: Math.min(10, voteHistory.length) }, (_, i) => (
              <text key={i} x={50 + (900 / Math.min(9, voteHistory.length - 1)) * i} y="370" textAnchor="middle" fill="#9CA3AF">{i + 1}</text>
            ))}
            
            {Array.from({ length: 6 }, (_, i) => (
              <text key={i} x="40" y={350 - i * 60} textAnchor="end" fill="#9CA3AF">{i * 2}</text>
            ))}

            {Array.from({ length: 6 }, (_, i) => (
              <line key={i} x1="50" y1={350 - i * 60} x2="950" y2={350 - i * 60} stroke="#4B5563" strokeWidth="1" />
            ))}

            {showGraph && copywritingEntries.map((entry, entryIndex) => {
              const points = voteHistory.map((votes, index) => 
                `${50 + (900 / Math.max(1, voteHistory.length - 1)) * index},${350 - (votes[entry] || 0) * 30}`
              ).join(' ');
              const isFirstPlace = sortedEntries[0] && sortedEntries[0][0] === entry;

              return (
                <g key={entryIndex}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={colors[entryIndex]}
                    strokeWidth={isFirstPlace ? "4" : "2"}
                  />
                  {isFirstPlace && (
                    <text
                      x={points.split(' ').pop().split(',')[0]}
                      y={points.split(' ').pop().split(',')[1]}
                      fontSize="20"
                      fill={colors[entryIndex]}
                      textAnchor="middle"
                    >
                      👑
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-6 flex flex-wrap justify-center">
          {copywritingEntries.map((_, index) => (
            <div key={index} className="flex items-center mr-4 mb-2 bg-gray-800 rounded-full px-3 py-1">
              <div style={{ width: '12px', height: '12px', backgroundColor: colors[index], marginRight: '5px', borderRadius: '50%' }}></div>
              <span className="text-sm text-gray-300">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">投票者一覧</h3>
        <p className="text-gray-700">{voters.join(', ')}</p>
      </div>
    </div>
  );
};

export default VotingForm;