import { useSubscription } from "../../../context/SubscriptionContext";

export default function AdminSubscriptionManagement() {
  const {
    subscriptionEnabled,
    toggleSubscriptionSystem,
    plans,
    updatePlanPrice,
    togglePlanActive,
    togglePlanFeature,
    commissionRates,
    updateCommissionRate,
  } = useSubscription();

  return (
    <div className="min-h-screen bg-neutral-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Subscription Management
        </h1>
        <p className="text-teal-100 text-sm mt-1">
          Configure and manage seller subscription plans
        </p>
      </div>

      <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-6">
        {/* Commission Configuration */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-800">
                Commission Configuration
              </h2>
              <p className="text-xs text-neutral-500">
                Set global commission rates for different seller tiers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Standard Commission */}
            <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
              <label className="block text-xs font-bold text-neutral-600 mb-2 uppercase tracking-wider">
                Standard Commission (Non-Subscribed)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={commissionRates.standard}
                  onChange={(e) => updateCommissionRate('standard', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2.5 text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-400">%</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-2">Applied to all sellers without an active subscription plan.</p>
            </div>

            {/* Premium Commission */}
            <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/30">
              <label className="block text-xs font-bold text-teal-700 mb-2 uppercase tracking-wider">
                Premium Commission (Subscribed)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={commissionRates.premium}
                  onChange={(e) => updateCommissionRate('premium', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-teal-200 rounded-lg px-3 py-2.5 text-sm font-bold text-teal-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-teal-400">%</span>
              </div>
              <p className="text-[10px] text-teal-600/70 mt-2 font-medium">Applied to sellers with any active subscription plan.</p>
            </div>
          </div>
        </div>

        {/* Global Toggle */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-neutral-800">
                Subscription System
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Enable or disable the subscription system for all sellers
              </p>
            </div>
            <button
              onClick={toggleSubscriptionSystem}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                subscriptionEnabled ? "bg-teal-600" : "bg-neutral-300"
              }`}>
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                  subscriptionEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                subscriptionEnabled
                  ? "bg-teal-50 text-teal-700"
                  : "bg-red-50 text-red-600"
              }`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  subscriptionEnabled ? "bg-teal-500" : "bg-red-500"
                }`}
              />
              {subscriptionEnabled ? "Active" : "Disabled"}
            </span>
          </div>
        </div>

        {/* Plans Management */}
        <div>
          <h2 className="text-base font-bold text-neutral-800 mb-4">
            Manage Plans
          </h2>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden transition-opacity ${
                  !subscriptionEnabled ? "opacity-50 pointer-events-none" : ""
                }`}>
                {/* Plan Header */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-neutral-50 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        plan.isActive
                          ? "bg-teal-100 text-teal-600"
                          : "bg-neutral-200 text-neutral-400"
                      }`}>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-800">
                        {plan.name} Plan
                      </h3>
                      <p className="text-xs text-neutral-500">{plan.duration}</p>
                    </div>
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide ${
                        plan.isActive ? "text-teal-600" : "text-neutral-400"
                      }`}>
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => togglePlanActive(plan.id)}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                        plan.isActive ? "bg-teal-600" : "bg-neutral-300"
                      }`}>
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                          plan.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Plan Body */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Price Input */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val >= 0) {
                            updatePlanPrice(plan.id, val);
                          }
                        }}
                        className="w-full pl-7 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>

                  {/* Features Toggles */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2">
                      Features
                    </label>
                    <div className="space-y-2">
                      {plan.features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-neutral-50 transition-colors">
                          <span className="text-sm text-neutral-700">
                            {feature.name}
                          </span>
                          <button
                            onClick={() =>
                              togglePlanFeature(plan.id, feature.id)
                            }
                            className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${
                              feature.enabled ? "bg-teal-600" : "bg-neutral-300"
                            }`}>
                            <span
                              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                                feature.enabled
                                  ? "translate-x-4"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
