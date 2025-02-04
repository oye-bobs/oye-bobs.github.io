import pandas as pd

def clean_product_data(input_file, output_file):
    # Load the data with proper encoding to handle unreadable text
    df = pd.read_csv(input_file, encoding='ISO-8859-1')
    
    # Drop rows with missing essential numerical values
    df = df.dropna(subset=['PRODUCTTYPEID', 'ProductLength'])
    
    # Fill missing text columns with placeholders
    df['BULLET_POINTS'] = df['BULLET_POINTS'].fillna('No bullet points available')
    df['DESCRIPTION'] = df['DESCRIPTION'].fillna('No description available')
    
    # Format text columns properly
    df['TITLE'] = df['TITLE'].str.title()
    df['BULLET_POINTS'] = df['BULLET_POINTS'].str.strip()
    df['DESCRIPTION'] = df['DESCRIPTION'].str.strip()
    
    # Reset index after dropping rows
    df = df.reset_index(drop=True)
    
    # Save cleaned data to a new CSV file with UTF-8 encoding
    df.to_csv(output_file, index=False, encoding='utf-8')
    
    print(f"Data cleaning completed. Cleaned file saved as: {output_file}")

# Example usage
input_file = "productdata.csv"  # Update this with your actual file path
output_file = "cleaned_productdata.csv"
clean_product_data(input_file, output_file)
