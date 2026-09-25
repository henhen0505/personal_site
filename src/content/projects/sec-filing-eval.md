---
title: "SEC Filing Evaluation Harness"
summary: "Evaluation harness for numerical faithfulness on SEC filings, built on the open LEDGER benchmark, with an 8-class error taxonomy and unit-normalization that eliminated a 74% phantom scale-error rate."
tags: ["Python", "Anthropic Claude API", "RAG", "HuggingFace datasets", "pandas", "pytest"]
github: "https://github.com/henhen0505/fin-rag-eval"
status: "Reference run complete"
period: "May – August 2026"
domains: ["AI/LLM", "Backend", "Data"]
order: 1
---

## What it does

Measures whether a retrieval-augmented system's numerical answers about SEC filings are
actually correct, using the open **LEDGER** benchmark as the base. Extraction accuracy on its
own hides the failure mode that matters in finance: an answer can locate the right figure and
still be wrong by a factor of a thousand. Every wrong answer is classified into an **8-class**
error taxonomy (correct, retrieval, wrong_period, wrong_line_item, sign_error,
presentation_unit, computation, extraction, no_answer) rather than collapsed into a single
accuracy number.

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

## The scale-error finding

An early diagnostic run of **25** questions across ~20 companies scored **4%** raw accuracy.
Read alone, that number says retrieval is broken. It isn't: **72%** of the answers had found
the correct figure at the wrong scale. A single accuracy percentage would have sent the fix to
the wrong layer.

Models frequently self-declare the scale they're reporting in ("in thousands," "in millions")
while LEDGER's gold values are absolute. A naive scorer that discards that declared unit
manufactures a phantom scale-error rate. A larger, **n=50** follow-up run (`--edgar-only`,
claude-haiku-4-5, full-context retrieval) reproduced the same failure mode at scale: **37 of
50** answers declared a scale that a raw comparison would have penalized, and a naive scorer
would flag all 37 as `presentation_unit` errors -- a **74%** phantom rate -- where unit-aware
normalization scores them correct.

| Metric | Value |
|---|---|
| n=50 run: correct | 39 (78%) |
| n=50 run: extraction | 8 (16%) |
| n=50 run: no_answer | 2 (4%) |
| n=50 run: sign_error | 1 (2%) |
| Phantom scale-error rate (naive scorer) | 74% |
| Benchmark discrepancies found | 6 |
| Generated computed-metric questions | 3,700+ |

## Manual audit

Manual review of the **11** non-correct records in the n=50 run found problems in the
benchmark's own gold labels: **1** confirmed gold error (Eastman shares-issued mislabeled as
shares-outstanding; the model was actually correct), **1** likely gold error (Sherwin-Williams
diluted EPS under a basic-EPS label), **1** invalid test case (truncated context), **1** within
~1bp of tolerance, and only **1** clean model error. Crediting the confirmed error and the
boundary case: effective faithfulness **41/50 (82%)**.

## Architecture

- `data/` -- streaming loaders and gold lookups
- `questions/` -- question banks (pass-through gold plus generated computed metrics)
- `evaluator/` -- context assembly and unit normalization
- `taxonomy/` -- the 8-class error classifier
- `pipeline/` -- RAGSystem Protocol, Anthropic adapter, hard budget cap (an unpriced model
  fails loud rather than billing silently)
- `reporter/` -- aggregation and CSV/JSON export

## Tests

**80+** tests in `pytest`. The offline suite stubs the RAG client and data loaders; a separate
integration suite hits the real HuggingFace Hub.

## Limitations

1. The n=50 run is one model, one retrieval mode. The 78% is a point estimate, not a claim of
   generality.
2. The 8-class classifier itself is unvalidated -- a human-labeling study is planned but not
   done.
3. Gold labels are not ground truth, as the manual audit demonstrated.
4. No genuine presentation_unit error appeared in either run, so the harness is shown to
   *remove* phantom scale errors, not yet shown to *catch* a real one.
