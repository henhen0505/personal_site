---
title: "Gene-Environment Interaction Analysis"
summary: "Regression study on a 24-predictor dataset: Box-Cox transformation, BIC forward selection and MICE imputation over 21% missing data, in R."
tags: ["R", "Regression", "MICE", "Statistics"]
status: "Complete"
period: "November 2025"
domains: ["Data"]
order: 5
---

## Part one: finding the interaction

A synthetic dataset of n = 1,111 observations with 24 predictors, where the question was
whether any gene-environment interaction carried signal beyond the main effects.

A Box-Cox transformation at λ = 0.5 moved adjusted R² from **45.2%** to **50.8%**. BIC forward
selection then identified a significant epistatic interaction (t = 7.50, p = 1.26e-13)
contributing **2.6%** additional variance on top of the main-effect model.

The 2.6% is the honest number to report. The interaction is unambiguously there by the p-value
and it is also a small share of what the model explains. Both facts belong in the write-up.

## Part two: missing data

A second regression study (n = 620) arrived with **21.1%** of values missing. Dropping
incomplete rows would have discarded a fifth of the sample and biased whatever survived.

I used MICE multiple imputation with the `norm.boot` method, then applied a Bonferroni
correction across the resulting tests.

## Writing a test that wasn't in the package

The standard lack-of-fit test I needed wasn't available in the package version on hand, so I
implemented it directly from the F-statistic definition, partitioning residual sum of squares
into pure error and lack of fit against the replicate structure in the data. Checking it
against a case with a known answer first mattered more than writing it quickly.

## Coursework context

AMS 315, Data Analysis. Written in R.
