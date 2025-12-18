
import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Sparkles, Trash2, ChevronUp, Info, Paintbrush, ReceiptText } from 'lucide-react';

const App = () => {
  useEffect(() => {
    document.title = "美甲計價助手";
  }, []);

  const [prices, setPrices] = useState({
    singleColor: 600,
    catEye: 700,
    decorationSmall: 50,
    handPaint: 90,
    removalOwnFollowup: 100,
    removalOwnPure: 200,
    removalOtherFollowup: 200,
  });

  const [selections, setSelections] = useState({
    baseStyle: 'none',
    smallDecoCount: 0,
    handPaintCount: 0,
    removal: 'none',
  });

  const totalPrice = useMemo(() => {
    let total = 0;
    if (selections.baseStyle === 'single') total += prices.singleColor;
    if (selections.baseStyle === 'catEye') total += prices.catEye;
    total += selections.smallDecoCount * prices.decorationSmall;
    total += selections.handPaintCount * prices.handPaint;
    if (selections.removal === 'ownFollowup') total += prices.removalOwnFollowup;
    if (selections.removal === 'ownPure') total += prices.removalOwnPure;
    if (selections.removal === 'otherFollowup') total += prices.removalOtherFollowup;
    return total;
  }, [selections, prices]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>美甲計價助手</h1>
      <p>總金額：${totalPrice}</p>
    </div>
  );
};

export default App;
