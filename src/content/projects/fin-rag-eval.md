---
title: "Financial RAG Evaluation Harness"
summary: "Diagnostic evaluation harness for numerical faithfulness in financial RAG, with an 8-class error taxonomy and unit-normalization that eliminated a 74% phantom scale-error rate."
tags: ["Python", "Anthropic Claude API", "HuggingFace datasets", "pytest"]
github: "https://github.com/henhen0505/fin-rag-eval"
status: "Reference run complete"
period: "May – August 2026"
domains: ["AI/LLM", "Data"]
order: 1.5
---

## What it does

Evaluates whether a RAG system's numerical answers about SEC filings are faithful to the
source, classifying every wrong answer into an **8-class** error taxonomy (correct, retrieval,
wrong_period, wrong_line_item, sign_error, presentation_unit, computation, extraction,
no_answer) rather than reporting a single accuracy number.

Related to the [SEC Filing Evaluation Harness](/projects/sec-filing-eval): both build on the
open LEDGER benchmark. This harness focuses on error classification and the unit-normalization
problem that benchmark revealed.

## Unit-normalization principle

Models frequently self-declare a reporting scale ("in thousands," "in millions") while the
gold values in LEDGER are absolute. A naive scorer that ignores the declared unit manufactures
a **74%** phantom scale-error rate. Unit-aware normalization scores those same answers
correctly -- **37 of 50** answers in the reference run declared a scale that a raw comparison
would penalize.

## Reference run

**n=50**, `--edgar-only` mode, claude-haiku-4-5, full-context retrieval:

| Error class | Count | Rate |
|---|---|---|
| correct | 39 | 78% |
| extraction | 8 | 16% |
| no_answer | 2 | 4% |
| sign_error | 1 | 2% |
| wrong_period, wrong_line_item, computation, retrieval | 0 | 0% |

## Manual audit

Manual review of the **11** non-correct records found problems in the benchmark gold labels
themselves: **1** confirmed gold error (Eastman shares-issued mislabeled as
shares-outstanding; model was correct), **1** likely gold error (Sherwin-Williams diluted EPS
under basic-EPS label), **1** invalid test case (truncated context), **1** within ~1bp of
tolerance. Only **1** clean model error in the set.

Crediting the confirmed gold error and boundary case: effective faithfulness **41/50 (82%)**.

## Architecture

- `data/` -- streaming loaders and gold lookups
- `questions/` -- question banks
- `evaluator/` -- context assembly and unit normalization
- `taxonomy/` -- 8-class error classifier
- `pipeline/` -- RAGSystem Protocol, Anthropic adapter, hard budget cap (unpriced model fails
  loud rather than billing silently)
- `reporter/` -- aggregation and CSV/JSON export

## Tests

Offline pytest suite stubs the RAG client and data loaders. Separate integration suite hits
the real HuggingFace Hub.

## Limitations

1. n=50, one model, one retrieval mode. The 78% is a point estimate, not a claim of
   generality.
2. The 8-class classifier itself is unvalidated -- a human-labeling study is planned but not
   done.
3. Gold labels are not ground truth (as the audit demonstrated).
4. No genuine presentation_unit error appeared in this run, so the harness is shown to
   *remove* phantom errors, not yet shown to *catch* a real one.
