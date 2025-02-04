import pandas as pd
import os

def clean_product_data(input_file, output_file):
    """
    Clean product data from CSV and save to a new file
    """
    try:
        # Read the CSV file
        print(f"Reading file: {input_file}")
        df = pd.read_csv(input_file)
        
        # Store initial row count
        initial_rows = len(df)
        
        # Clean BULLET_POINTS column
        print("Cleaning BULLET_POINTS...")
        df["BULLET_POINTS"] = df["BULLET_POINTS"].fillna("No bullet points available")
        df["BULLET_POINTS"] = df["BULLET_POINTS"].astype(str).str.replace(r"[\[\]']", "", regex=True)
        
        # Clean DESCRIPTION column
        print("Cleaning DESCRIPTION...")
        df["DESCRIPTION"] = df["DESCRIPTION"].fillna("No description available")
        
        # Convert numeric columns
        print("Converting numeric columns...")
        df["PRODUCTTYPEID"] = pd.to_numeric(df["PRODUCTTYPEID"], errors="coerce")
        df["ProductLength"] = pd.to_numeric(df["ProductLength"], errors="coerce")
        
        # Remove duplicates
        print("Removing duplicates...")
        df = df.drop_duplicates(subset=["PRODUCTID"], keep="first")
        
        # Strip whitespace from text columns
        print("Cleaning text columns...")
        text_columns = ["TITLE", "BULLET_POINTS", "DESCRIPTION"]
        for col in text_columns:
            df[col] = df[col].astype(str).str.strip()
        
        # Save cleaned data
        print(f"Saving cleaned data to: {output_file}")
        df.to_csv(output_file, index=False, encoding='utf-8')
        
        # Print summary
        print("\nCleaning Summary:")
        print(f"Initial rows: {initial_rows}")
        print(f"Final rows: {len(df)}")
        print(f"Duplicates removed: {initial_rows - len(df)}")
        print("\nMissing values after cleaning:")
        print(df.isnull().sum())
        
        return True
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    # Set file paths
    input_file = r"C:\Users\dell\Documents\HNG INTERNSHIP\Products\productdata.xlsx - Sheet1.csv"
    output_file = r"C:\Users\dell\Documents\HNG INTERNSHIP\Products\products.csv"
    
    # Run cleaning process
    success = clean_product_data(input_file, output_file)
    
    if success:
        print("\nData cleaning completed successfully!")
        # Verify file exists and show size
        if os.path.exists(output_file):
            size_kb = os.path.getsize(output_file) / 1024
            print(f"Output file size: {size_kb:.2f} KB")
    else:
        print("\nData cleaning failed!")