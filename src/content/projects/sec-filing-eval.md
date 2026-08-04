---
title: "SEC Filing Evaluation Harness"
summary: "Evaluation harness for numerical accuracy on SEC filings, built on the open LEDGER benchmark. A 4% accuracy score turned out to be hiding a unit-scale bug."
tags: ["Python", "Claude API", "RAG", "pandas", "pytest"]
status: "Diagnostic stage complete"
period: "August 2026"
domains: ["AI/LLM", "Backend", "Data"]
order: 1
---

## What it does

Measures whether a retrieval-augmented system's numerical answers about SEC filings are
actually correct, using the open **LEDGER** benchmark as the base. Extraction accuracy on its
own hides the failure mode that matters in finance: an answer can locate the right figure and
still be wrong by a factor of a thousand.

## Verifying the benchmark before building on it

I checked the published dataset against raw SEC EDGAR XBRL filings before writing any
evaluation code and found **six** discrepancies the dataset doesn't note. Building a scoring
harness on top of an unverified ground truth means every number it reports inherits those
errors silently.

## Extending past extraction

LEDGER asks models to pull figures out of filings. It doesn't ask them to compute anything.
I generated **3,700+** questions on derived metrics (margins, ratios, year over year growth)
from EDGAR XBRL ground truth, so the harness covers arithmetic over filings and not lookup
alone.

## What the diagnostic run found

A run over **25** questions spanning about **20** companies scored **4%** raw accuracy. Read
alone, that number says retrieval is broken.

It isn't. **72%** of the answers had found the correct figure at the wrong scale. The
underlying retrieval was working and the failure was in unit and scale handling. A single
accuracy percentage would have sent the fix to the wrong layer.

| Metric | Value |
|---|---|
| Questions in diagnostic run | 25 |
| Companies covered | ~20 |
| Raw accuracy | 4% |
| Right figure, wrong scale | 72% |
| Benchmark discrepancies found | 6 |
| Generated computed-metric questions | 3,700+ |

## Tests

**80+** tests in `pytest` across the data layer, question generation, taxonomy, evaluator and
reporter.

## Limitations

The diagnostic run is 25 questions. It is large enough to show that the raw score was
misleading and not large enough to put a confidence interval on the 72%. Scaling the run is
the next step, not a claim I'm making now.
