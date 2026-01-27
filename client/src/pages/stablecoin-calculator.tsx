ansition-colors" data-testid="button-reset">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {!showResults ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <svg className="w-16 h-16 mx-auto mb-6 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-serif text-xl font-semibold text-aryo-deepBlue mb-3">Configure Your Analysis</h3>
                  <p className="text-slate-500 max-w-md mx-auto">Select your industry and company parameters, then click "Calculate Savings" to generate a comprehensive stablecoin savings analysis.</p>
                </div>
              ) : results && results.best && (
                <>
                  <div className="bg-gradient-to-br from-aryo-deepBlue to-[#1a3666] rounded-xl p-10 text-white relative overflow-hidden">
                    <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-[radial-gradient(circle,rgba(71,181,203,0.1)_0%,transparent_70%)]" />
                    <div className="relative z-10">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-aryo-greenTeal mb-4 block">Estimated Annual Savings</span>
                      <div className="font-serif text-3xl md:text-4xl font-semibold mb-2" data-testid="text-total-savings">{formatCurrency(results.best.totalBenefit)}</div>
                      <div className="text-lg opacity-90 font-light" data-testid="text-five-year">5-Year Projection: {formatCurrency(results.fiveYear)}</div>
                      <div className="flex gap-6 mt-6 pt-6 border-t border-white/15">
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Recommended</div>
                          <div className="text-base font-semibold" data-testid="text-recommended-coin">{results.best.name} ({results.best.type})</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Treasury Yield</div>
                          <div className="text-base font-semibold" data-testid="text-treasury-yield">{results.best.yieldPotential}% APY</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">Savings Breakdown</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-400 rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><RefreshCw size={14} /> FX Costs (Current)</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.fxCosts)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.fx)}</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-400 rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><Zap size={14} /> Wire Fees (Current)</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.wireFees)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.wire)}</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-400 rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><Clock size={14} /> Settlement Float</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.settlementCost)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.settlement)}</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><Wallet size={14} /> Treasury Yield</span>
                          </div>
                          <div className="text-lg font-bold text-aryo-greenTeal mb-1">+{formatCurrency(results.best.treasuryYield)}</div>
                          <div className="text-xs text-slate-500">{treasuryAllocation}% allocation @ {results.best.yieldPotential}%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-aryo-deepBlue">Stablecoin Comparison</h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-greenTeal" /> Cost Savings
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-teal" /> Treasury Yield
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="h-[300px]">
                        <canvas ref={chartRef} data-testid="chart-comparison" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">Strategic Insights</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <Clock className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{selectedIndustry?.settlementDays}d → 3min</div>
                          <div className="text-xs text-slate-500">Settlement Time</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <Globe className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{formatCurrency(results.crossBorder)}</div>
                          <div className="text-xs text-slate-500">Volume Optimized</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <Wallet className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{formatCurrency(results.treasury * (treasuryAllocation / 100))}</div>
                          <div className="text-xs text-slate-500">Earning Yield</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <TrendingUp className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{((results.best.totalBenefit / results.revenue) * 100).toFixed(2)}%</div>
                          <div className="text-xs text-slate-500">Revenue Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
