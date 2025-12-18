#   
import React, { useState, useMemo } from 'react';  
import {   
  Calculator,   
  Sparkles,   
  Trash2,   
  ChevronRight,   
  Info,  
  ChevronUp,  
  Paintbrush  
} from 'lucide-react';  
  
const App = () => {  
  // **初始價格設定** (**根據您的要求調整**)  
  const **[**prices, setPrices**]** = useState({  
    singleColor: 600,  
    catEye: 700,  
    decorationSmall: 50,  
    handPaint: 90,  
    removalOwnFollowup: 100,  
    removalOwnPure: 200,  
    removalOtherFollowup: 200,  
  });  
  
  // **選擇狀態**  
  const **[**selections, setSelections**]** = useState({  
    baseStyle: 'none', // none, single, catEye  
    smallDecoCount: 0,  
    handPaintCount: 0,  
    removal: 'none', // none, ownFollowup, ownPure, otherFollowup  
  });  
  
  const **[**isPriceSettingsOpen, setIsPriceSettingsOpen**]** = useState(false);  
  
  // **計算總價**  
  const totalPrice = useMemo(() => {  
    let total = 0;  
      
    // **經典款式**  
    if (selections.baseStyle === 'single') total += prices.singleColor;  
    if (selections.baseStyle === 'catEye') total += prices.catEye;  
      
    // **細節點綴**  
    total += selections.smallDecoCount * prices.decorationSmall;  
    total += selections.handPaintCount * prices.handPaint;  
      
    // **卸甲服務**  
    if (selections.removal === 'ownFollowup') total += prices.removalOwnFollowup;  
    if (selections.removal === 'ownPure') total += prices.removalOwnPure;  
    if (selections.removal === 'otherFollowup') total += prices.removalOtherFollowup;  
      
    return total;  
  }, **[**selections, prices**]**);  
  
  const resetSelections = () => {  
    setSelections({  
      baseStyle: 'none',  
      smallDecoCount: 0,  
      handPaintCount: 0,  
      removal: 'none',  
    });  
  };  
  
  const updatePrice = (key, val) => {  
    setPrices(prev => ({ ...prev, **[**key**]**: parseInt(val) || 0 }));  
  };  
  
  return (  
    <div className="min-h-screen bg-rose-50 pb-32 font-sans text-gray-800">  
      {/* Header */}  
      <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center sticky top-0 z-10">  
        <div className="flex items-center gap-2">  
          <div className="bg-rose-400 p-2 rounded-lg text-white">  
            <Sparkles size={20} />  
          </div>  
          <h1 className="text-xl font-bold text-rose-600 tracking-tight">**美甲計價助手**</h1>  
        </div>  
        <button   
          onClick={() => setIsPriceSettingsOpen(!isPriceSettingsOpen)}  
          className="text-gray-500 hover:text-rose-500 transition-colors"  
        >  
          {isPriceSettingsOpen ? <ChevronUp size={24} /> : <Calculator size={24} />}  
        </button>  
      </header>  
  
      <main className="max-w-md mx-auto p-4 space-y-4">  
          
        {/* **價格設定面板** */}  
        {isPriceSettingsOpen && (  
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 animate-in fade-in slide-in-from-top-4 duration-300">  
            <h2 className="font-bold mb-4 flex items-center gap-2 text-gray-700">  
              <Info size={18} className="text-rose-400" /> **單價快速調整**  
            </h2>  
            <div className="grid grid-cols-2 gap-4 text-sm">  
              {Object.keys(prices).map((key) => (  
                <div key={key} className="flex flex-col gap-1">  
                  <label className="text-gray-500 text-xs">  
                    {key === 'singleColor' && '**漂亮單色**'}  
                    {key === 'catEye' && '**高級貓眼**'}  
                    {key === 'decorationSmall' && '**小飾品**/**貼紙**'}  
                    {key === 'handPaint' && '**手繪**'}  
                    {key === 'removalOwnFollowup' && '**本店續作**'}  
                    {key === 'removalOwnPure' && '**本店純卸**'}  
                    {key === 'removalOtherFollowup' && '**他店續作**'}  
                  </label>  
                  <input   
                    type="number"   
                    value={prices**[**key**]**}   
                    onChange={(e) => updatePrice(key, e.target.value)}  
                    className="border border-rose-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 outline-none bg-rose-50/30"  
                  />  
                </div>  
              ))}  
            </div>  
          </div>  
        )}  
  
        {/* **經典款式** */}  
        <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4 border border-white">  
          <h2 className="font-bold text-gray-700 border-l-4 border-rose-400 pl-3">**經典款式**</h2>  
          <div className="grid grid-cols-2 gap-3">  
            {**[**  
              { id: 'single', label: '**漂亮單色**', price: prices.singleColor },  
              { id: 'catEye', label: '**高級貓眼**', price: prices.catEye },  
            **]**.map((style) => (  
              <button  
                key={style.id}  
                onClick={() => setSelections(s => ({...s, baseStyle: s.baseStyle === style.id ? 'none' : style.id}))}  
                className={`p-4 rounded-xl border-2 text-center transition-all ${  
                  selections.baseStyle === style.id   
                  ? 'border-rose-400 bg-rose-50 shadow-inner'   
                  : 'border-gray-50 bg-gray-50/50 hover:border-rose-100'  
                }`}  
              >  
                <p className="font-bold text-gray-700">{style.label}</p>  
                <p className="text-sm text-rose-500 mt-1 font-medium">${style.price}</p>  
              </button>  
            ))}  
          </div>  
        </section>  
  
        {/* **細節點綴** */}  
        <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4">  
          <h2 className="font-bold text-gray-700 border-l-4 border-rose-400 pl-3">**細節點綴**</h2>  
          <div className="space-y-4">  
            <Counter   
              label="**小飾品** / **貼紙**"   
              subLabel={`**每個** +$${prices.decorationSmall}`}  
              value={selections.smallDecoCount}  
              onChange={(v) => setSelections(s => ({...s, smallDecoCount: v}))}  
            />  
            <Counter   
              label="**手繪設計**"   
              subLabel={`**每指** +$${prices.handPaint}`}  
              value={selections.handPaintCount}  
              onChange={(v) => setSelections(s => ({...s, handPaintCount: v}))}  
              icon={<Paintbrush size={14} className="text-rose-400" />}  
            />  
          </div>  
        </section>  
  
        {/* **卸甲** */}  
        <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4">  
          <h2 className="font-bold text-gray-700 border-l-4 border-rose-400 pl-3">**卸甲**</h2>  
          <div className="grid grid-cols-1 gap-2">  
            {**[**  
              { id: 'none', label: '**無需卸甲**' },  
              { id: 'ownFollowup', label: '**本店卸甲續作**', price: prices.removalOwnFollowup },  
              { id: 'ownPure', label: '**本店純卸甲**', price: prices.removalOwnPure },  
              { id: 'otherFollowup', label: '**他店卸甲續作**', price: prices.removalOtherFollowup },  
            **]**.map((rem) => (  
              <button  
                key={rem.id}  
                onClick={() => setSelections(s => ({...s, removal: rem.id}))}  
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${  
                  selections.removal === rem.id   
                  ? 'border-rose-400 bg-rose-50 font-bold text-rose-600'   
                  : 'border-gray-100 text-gray-600 hover:bg-gray-50'  
                }`}  
              >  
                <span className="text-sm">{rem.label}</span>  
                {rem.price && <span className="text-xs font-bold text-rose-500">+${rem.price}</span>}  
              </button>  
            ))}  
          </div>  
        </section>  
      </main>  
  
      {/* **底部結帳欄** */}  
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-rose-100 p-6 flex items-center justify-between shadow-**[**0_-4px_20px_rgba(0,0,0,0.05)**]** z-20">  
        <div className="flex flex-col">  
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Estimated Total</span>  
          <span className="text-3xl font-black text-rose-600 leading-tight">  
            <span className="text-xl mr-1 font-bold">$</span>{totalPrice.toLocaleString()}  
          </span>  
        </div>  
        <div className="flex gap-2">  
          <button   
            onClick={resetSelections}  
            className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors"  
          >  
            <Trash2 size={24} />  
          </button>  
          <button   
            className="px-8 py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-transform active:scale-95 flex items-center gap-2"  
          >  
            **確認單據** <ChevronRight size={20} />  
          </button>  
        </div>  
      </footer>  
    </div>  
  );  
};  
  
// **計數器組件**  
const Counter = ({ label, subLabel, value, onChange, icon }) => {  
  return (  
    <div className="flex items-center justify-between p-2">  
      <div className="flex items-center gap-2">  
        {icon}  
        <div>  
          <p className="text-sm font-semibold text-gray-700">{label}</p>  
          <p className="text-xs text-gray-400">{subLabel}</p>  
        </div>  
      </div>  
      <div className="flex items-center gap-4 bg-rose-50/50 p-1 rounded-xl">  
        <button   
          onClick={() => onChange(Math.max(0, value - 1))}  
          className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-rose-500 disabled:opacity-30 transition-all active:scale-90"  
          disabled={value === 0}  
        >  
          -  
        </button>  
        <span className="w-6 text-center font-bold text-rose-600">{value}</span>  
        <button   
          onClick={() => onChange(value + 1)}  
          className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-rose-500 transition-all active:scale-90"  
        >  
          +  
        </button>  
      </div>  
    </div>  
  );  
};  
  
export default App;  
  
