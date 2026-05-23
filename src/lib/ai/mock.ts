interface MockContext {
  projectName: string;
  projectDescription: string;
  history: { role: string; content: string }[];
  userMessage: string;
}

function extractKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const keywords: string[] = [];
  const patterns: Record<string, string[]> = {
    market: ["saas", "b2b", "b2c", "marketplace", "platform", "app", "software", "ecommerce", "fintech", "healthtech", "edtech", "ai", "ml"],
    problem: ["pain point", "problem", "challenge", "issue", "struggle", "need", "gap", "inefficient"],
    audience: ["users", "customers", "businesses", "companies", "consumers", "professionals", "developers", "students", "enterprise"],
    revenue: ["subscription", "freemium", "commission", "ads", "advertising", "premium", "license", "pay per use"],
  };
  for (const [, words] of Object.entries(patterns)) {
    for (const word of words) {
      if (lower.includes(word)) keywords.push(word);
    }
  }
  return keywords;
}

function generateScore(description: string): number {
  const text = description.toLowerCase();
  let score = 55;

  if (text.length > 100) score += 5;
  if (text.length > 300) score += 5;

  const boostWords = ["ai", "saas", "platform", "marketplace", "automation", "data", "analytics", "cloud", "mobile", "api"];
  for (const w of boostWords) {
    if (text.includes(w)) score += 3;
  }

  const riskWords = ["maybe", "not sure", "might", "possibly", "unclear"];
  for (const w of riskWords) {
    if (text.includes(w)) score -= 2;
  }

  return Math.max(30, Math.min(92, score + Math.floor(Math.random() * 10) - 5));
}

export function mockAnalystResponse(ctx: MockContext): { response: string; score?: number; pricingTier?: string } {
  const messageCount = ctx.history.filter(m => m.role === "user").length;
  const keywords = extractKeywords(ctx.projectDescription + " " + ctx.userMessage);

  if (messageCount === 0) {
    return {
      response: `Great, let's analyze **${ctx.projectName}**.

I'll evaluate your startup idea across five key dimensions: Market Size, Competition, Timing, Uniqueness, and Feasibility.

Based on your description, I can see you're working on: *"${ctx.projectDescription}"*

Let me ask a few questions to refine my analysis:

1. **Target Market**: Who is your primary customer? (B2B/B2C, geographic focus, segment size)
2. **Revenue Model**: How do you plan to monetize? (subscription, transaction fees, freemium, etc.)
3. **Competition**: Who are your main competitors, and what's your key differentiator?

Share as much detail as you can, and I'll generate a comprehensive validation score.`
    };
  }

  if (messageCount === 1) {
    return {
      response: `Excellent insights! Here's what I'm gathering:

${keywords.length > 0 ? `**Key signals detected**: ${keywords.join(", ")}` : ""}

A few more questions to complete the analysis:

1. **Unit Economics**: What's your expected customer acquisition cost vs. lifetime value?
2. **Traction**: Do you have any early signals — waitlist signups, letters of intent, or pilot users?
3. **Team**: What relevant expertise do you bring to this space?

Once I have these details, I'll generate your full Validation Score with actionable recommendations.`
    };
  }

  const score = generateScore(ctx.projectDescription + " " + ctx.userMessage);
  const tier = score >= 65 ? "HIGH_POTENTIAL" : "COMPLEX_BUILD";

  const marketSize = Math.min(100, score + Math.floor(Math.random() * 15) - 7);
  const competition = Math.min(100, 100 - score + Math.floor(Math.random() * 20));
  const timing = Math.min(100, score + Math.floor(Math.random() * 10));
  const uniqueness = Math.min(100, score + Math.floor(Math.random() * 12) - 3);
  const feasibility = Math.min(100, score + Math.floor(Math.random() * 8));

  return {
    response: `## Validation Report: ${ctx.projectName}

### Overall Score: ${score}/100 ${score >= 75 ? "— Strong Potential" : score >= 60 ? "— Moderate Potential" : "— Needs Refinement"}

---

### Dimension Breakdown

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Market Size | ${marketSize}/100 | ${marketSize >= 70 ? "Large addressable market with growth potential" : "Niche market — consider expansion strategies"} |
| Competition | ${competition}/100 | ${competition <= 40 ? "Low competition — first-mover advantage" : "Moderate competition — differentiation critical"} |
| Timing | ${timing}/100 | ${timing >= 70 ? "Favorable market timing — trends align" : "Timing is acceptable but monitor market shifts"} |
| Uniqueness | ${uniqueness}/100 | ${uniqueness >= 70 ? "Strong differentiation from existing solutions" : "Consider strengthening your unique value proposition"} |
| Feasibility | ${feasibility}/100 | ${feasibility >= 70 ? "Technically feasible with available resources" : "May require additional technical capabilities"} |

---

### Market Analysis

**TAM (Total Addressable Market)**: Estimated at ${score >= 70 ? "$5-15B" : "$500M-2B"} based on ${keywords.length > 0 ? keywords.slice(0, 3).join(", ") : "the sector"} dynamics.

**Key Competitors**: While there are existing players in this space, your approach of *${ctx.projectDescription.slice(0, 80)}* provides meaningful differentiation.

**Timing Signal**: ${score >= 65 ? "Market conditions are favorable. Recent trends in AI, automation, and digital transformation create strong tailwinds." : "The market is developing. Early entry carries risk but also potential for category creation."}

---

### Recommendations

${score >= 75 ? `1. **Move fast** — your idea has strong potential. Proceed to BUILD phase immediately.
2. **Focus on retention** — early user engagement will be your most valuable metric.
3. **Build an MVP** — start with the core value proposition, iterate based on user feedback.` :
score >= 60 ? `1. **Refine your positioning** — clarify your unique value proposition.
2. **Validate with interviews** — talk to 20+ potential customers before building.
3. **Consider a simpler MVP** — reduce scope to accelerate time-to-market.` :
`1. **Pivot consideration** — the current positioning may need significant refinement.
2. **Problem validation** — ensure the problem is painful enough for users to pay.
3. **Competitive analysis** — deeper research into why existing solutions fall short.`}

---

### Pricing Assessment

${tier === "HIGH_POTENTIAL" ?
`**Tier: High Potential** — Low upfront fee (€1,500) with future upside through SIF Contract.` :
`**Tier: Complex Build** — Standard market rate for development with minimal upside share.`}

\`\`\`json
{"score": ${score}, "pricingTier": "${tier}"}
\`\`\`

Ready to proceed to the **Build Phase**? Click "Next Phase" to start generating your MVP assets.`,
    score,
    pricingTier: tier,
  };
}

export function mockBuilderResponse(ctx: MockContext): string {
  const messageCount = ctx.history.filter(m => m.role === "user").length;

  if (messageCount === 0) {
    return `## MVP Builder — ${ctx.projectName}

I'll help you create your startup's core assets. Here's what I can generate:

### Available Assets
1. **Landing Page** — Hero section, value proposition, features, social proof, CTA
2. **Marketing Copy** — Headlines, taglines, email sequences, ad copy
3. **Product Architecture** — Technical stack recommendations, MVP feature set
4. **Brand Messaging** — Positioning statement, elevator pitch, brand voice

What would you like to start with? I recommend beginning with your **Landing Page** — it's the fastest way to start collecting user interest.`;
  }

  if (ctx.userMessage.toLowerCase().includes("landing") || messageCount === 1) {
    return `## Landing Page — ${ctx.projectName}

Here's your AI-generated landing page structure:

---

### Hero Section
**Headline**: "${ctx.projectName} — ${ctx.projectDescription.split('.')[0]}"
**Subheadline**: "The smarter way to ${ctx.projectDescription.toLowerCase().includes("manage") ? "manage" : "solve"} what matters most."
**CTA Button**: "Get Early Access" / "Start Free Trial"

### Value Proposition (3 Pillars)
1. **Save Time** — Automate repetitive tasks and focus on what matters
2. **Reduce Costs** — Cut operational overhead by up to 60%
3. **Scale Faster** — Built to grow with your business from day one

### How It Works
1. Sign up in 30 seconds
2. Connect your existing tools
3. Let AI optimize your workflow
4. See results in real-time

### Social Proof Section
- "This product changed how we operate" — *Beta User*
- Metrics: "500+ early signups" / "4.8/5 satisfaction score"

### Pricing Preview
- **Free Tier**: Basic features, 1 user
- **Pro**: $29/mo, unlimited features
- **Enterprise**: Custom pricing

### Footer CTA
"Join ${Math.floor(Math.random() * 400 + 200)}+ founders already on the waitlist."

---

Want me to generate the **full HTML/CSS code** for this landing page, or should we work on **marketing copy** next?`;
  }

  return `## Generated Content — ${ctx.projectName}

### Marketing Copy Package

**Elevator Pitch** (30 seconds):
"${ctx.projectName} helps ${ctx.projectDescription.toLowerCase().includes("business") ? "businesses" : "people"} ${ctx.projectDescription.split('.')[0].toLowerCase()}. We're building the future of ${extractKeywords(ctx.projectDescription)[0] || "this space"}, and early users are already seeing results."

**Email Subject Lines**:
1. "You're spending too much time on this..."
2. "What if ${ctx.projectDescription.split(' ').slice(0, 5).join(' ').toLowerCase()} was automatic?"
3. "Early access: ${ctx.projectName} is live"

**Ad Copy (Meta/Google)**:
- Hook: "Stop wasting hours on manual processes"
- Body: "${ctx.projectName} automates your workflow with AI. Join 500+ early adopters."
- CTA: "Try Free for 14 Days"

**Product Description (App Store / ProductHunt)**:
"${ctx.projectName} is an AI-powered solution that ${ctx.projectDescription}. Built for teams who want to move faster without sacrificing quality."

Want me to generate more specific content or proceed to the **Test Phase**?`;
}

export function mockGrowthResponse(ctx: MockContext): string {
  const messageCount = ctx.history.filter(m => m.role === "user").length;

  if (messageCount === 0) {
    return `## Growth Strategy — ${ctx.projectName}

### Go-to-Market Framework

Based on your project profile, here's your recommended growth strategy:

**Phase 1: Pre-Launch (Days 3-5)**
- Set up landing page with email capture
- Create waiting list with referral incentive
- Seed 3-5 relevant communities (Reddit, ProductHunt, Twitter/X)

**Phase 2: Launch (Days 5-7)**
- ProductHunt launch strategy
- Targeted LinkedIn outreach (50 prospects/day)
- Initial paid ads: €200 budget, Meta + Google

**Phase 3: Growth (Week 2+)**
- Content marketing: 2 blog posts/week
- SEO optimization for key terms
- Partnership outreach to complementary products

### Channel Priority Matrix

| Channel | Cost | Time to Results | Expected CAC |
|---------|------|----------------|--------------|
| Organic Social | Low | 2-4 weeks | €5-15 |
| Paid Ads (Meta) | Medium | 3-5 days | €15-40 |
| Content/SEO | Low | 4-8 weeks | €3-10 |
| Direct Outreach | Low | 1-2 weeks | €10-25 |
| Partnerships | Low | 2-4 weeks | €5-15 |

What channel would you like me to deep-dive on? Or shall I create specific **ad campaigns** and **outreach templates**?`;
  }

  const visitors = Math.floor(Math.random() * 800 + 200);
  const signups = Math.floor(visitors * (Math.random() * 0.08 + 0.04));
  const conversion = ((signups / visitors) * 100).toFixed(1);

  return `## Market Testing Signals — ${ctx.projectName}

### Simulated 72-Hour Test Results

| Metric | Value | Benchmark |
|--------|-------|-----------|
| Landing Page Visitors | ${visitors} | — |
| Email Signups | ${signups} | — |
| Conversion Rate | ${conversion}% | ${parseFloat(conversion) > 5 ? "Above average" : "Industry standard"} |
| Avg. Time on Page | ${(Math.random() * 2 + 1.5).toFixed(1)}min | Good engagement |
| Bounce Rate | ${Math.floor(Math.random() * 20 + 35)}% | ${Math.random() > 0.5 ? "Below avg (good)" : "Average"} |
| Top Traffic Source | ${Math.random() > 0.5 ? "Direct/Social" : "Paid Ads"} | — |

### AI Analysis

${parseFloat(conversion) > 5 ? `**Strong signals detected.** Your conversion rate of ${conversion}% exceeds the typical benchmark of 3-5% for pre-launch landing pages. This suggests strong product-market fit.

**Recommendation: SCALE** — Increase ad spend, expand to additional channels, and begin building the full product.` :
`**Moderate signals.** Your conversion rate of ${conversion}% is within the normal range. The data suggests interest but not overwhelming demand yet.

**Recommendation: ITERATE** — Test different value propositions, refine your messaging, and consider targeting a narrower audience segment.`}

### Next Steps
1. ${parseFloat(conversion) > 5 ? "Double down on your best-performing ad creative" : "A/B test your headline and CTA"}
2. Reach out to ${signups > 30 ? "top engaged" : "all"} signups for user interviews
3. ${parseFloat(conversion) > 5 ? "Proceed to Raise phase with strong traction data" : "Run another test cycle with refined positioning"}

Ready to move to the **Raise Phase**?`;
}

export function mockInvestorResponse(ctx: MockContext): string {
  const messageCount = ctx.history.filter(m => m.role === "user").length;

  if (messageCount === 0) {
    return `## Fundraising Toolkit — ${ctx.projectName}

I'll help you prepare investor-ready materials. Here's what I can generate:

### 1. Pitch Deck (10 Slides)
Standard VC-ready format covering problem, solution, market, traction, team, and ask.

### 2. Financial Projections
3-year revenue model with assumptions, unit economics, and breakeven analysis.

### 3. Data Room Checklist
Everything investors expect: cap table, legal docs, metrics dashboard, competitive analysis.

### 4. Investor Targeting
Recommended investor profiles based on your sector, stage, and geography.

What would you like to start with? I recommend the **Pitch Deck** — it's the foundation for all investor conversations.`;
  }

  if (ctx.userMessage.toLowerCase().includes("pitch") || ctx.userMessage.toLowerCase().includes("deck") || messageCount === 1) {
    return `## Pitch Deck Outline — ${ctx.projectName}

### Slide 1: Cover
**${ctx.projectName}**
*${ctx.projectDescription.split('.')[0]}*
Pre-Seed Round | ${new Date().getFullYear()}

### Slide 2: Problem
- The current approach to [problem] is broken
- Users waste X hours/€ on manual processes
- No existing solution addresses the core issue

### Slide 3: Solution
- ${ctx.projectName} provides an AI-powered approach
- Key feature 1: Automation of core workflow
- Key feature 2: Real-time insights and analytics
- Key feature 3: Seamless integration with existing tools

### Slide 4: Market Size
- **TAM**: $10B+ (global market)
- **SAM**: $2B (target segment)
- **SOM**: $200M (initial geography/vertical)

### Slide 5: Business Model
- SaaS subscription (€29-€199/mo)
- Enterprise tier with custom pricing
- 80%+ gross margins at scale

### Slide 6: Traction
- MVP built in 7 days with PONYX
- Early validation score and market testing data
- First user signups and engagement metrics

### Slide 7: Competitive Landscape
- Positioned uniquely at intersection of [X] and [Y]
- Key differentiators: AI-native, speed, cost
- Defensibility through data network effects

### Slide 8: Go-to-Market
- Phase 1: Direct sales + content marketing
- Phase 2: Channel partnerships
- Phase 3: Self-serve growth engine

### Slide 9: Team
- Founder expertise in [domain]
- Powered by PONYX AI Operating System
- Advisory board and key hires planned

### Slide 10: The Ask
- **Raising**: €500K pre-seed
- **Use of funds**: Product (40%), Growth (35%), Operations (25%)
- **Milestones**: 1K users, €50K ARR in 12 months

---

### Financial Summary

| Year | Revenue | Users | MRR |
|------|---------|-------|-----|
| Y1 | €120K | 500 | €10K |
| Y2 | €600K | 2,500 | €50K |
| Y3 | €2.4M | 10,000 | €200K |

**Unit Economics**:
- CAC: €50 | LTV: €580 | LTV/CAC: 11.6x
- Payback Period: 2.1 months
- Gross Margin: 82%

Want me to elaborate on any section or generate the **Data Room checklist**?`;
  }

  return `## Data Room Checklist — ${ctx.projectName}

### Required Documents

**Legal & Corporate**
- [ ] Certificate of incorporation
- [ ] Shareholder agreement
- [ ] Cap table (current)
- [ ] IP assignment agreements
- [ ] Terms of service & privacy policy

**Financial**
- [ ] 3-year financial projections *(generated above)*
- [ ] Current burn rate and runway
- [ ] Bank statements (last 3 months)
- [ ] Revenue breakdown (if applicable)

**Product & Technology**
- [ ] Product demo / screenshots
- [ ] Technical architecture overview
- [ ] Roadmap (next 12 months)
- [ ] Security & compliance documentation

**Market & Traction**
- [ ] Market research / validation data *(from PONYX Validate phase)*
- [ ] User metrics and engagement data *(from PONYX Test phase)*
- [ ] Customer testimonials / case studies
- [ ] Competitive analysis

**Team**
- [ ] Founder bios and LinkedIn profiles
- [ ] Org chart (current + planned)
- [ ] Key hire plan with timeline

### Investor Targeting

Based on your profile, consider approaching:
1. **Pre-seed / Angel funds** focused on AI/tech
2. **Startup accelerators** (Y Combinator, Techstars, Plug and Play)
3. **Angel investors** with domain expertise
4. **Strategic investors** in your vertical

Your PONYX-generated materials give you a significant advantage — you have data-driven validation that most pre-seed startups lack.`;
}

export function mockChatWithAgent(
  agent: "validate" | "build" | "growth" | "raise",
  projectName: string,
  projectDescription: string,
  history: { role: string; content: string }[],
  userMessage: string
): { response: string; score?: number; pricingTier?: string } {
  const ctx: MockContext = { projectName, projectDescription, history, userMessage };

  switch (agent) {
    case "validate":
      return mockAnalystResponse(ctx);
    case "build":
      return { response: mockBuilderResponse(ctx) };
    case "growth":
      return { response: mockGrowthResponse(ctx) };
    case "raise":
      return { response: mockInvestorResponse(ctx) };
    default:
      return { response: "Agent not available. Please try again." };
  }
}
