import pandas as pd

df = pd.read_csv("../datasets/symptoms.csv")

print("Dataset Loaded Successfully\n")
print(df.head())

print("\nRows:", len(df))
print("Columns:", len(df.columns))

print("\nMissing Values:")
print(df.isnull().sum())