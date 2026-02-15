Respects rate limits and server terms of use
import time
import random
 and retry logice
    
    max_retries = 3
    retry_dlay = 5
       forattemptinrange(max_retries):         (Attempt {attempt + 1}/{max_retries}))
            
            # Add random delay to avoid rate limiting
            if attempt > 0:
                delay = retry_delay * (2 ** attempt + random.uniform(1, 3)        pint(f"Waiting {dlay:.1f} econds before retry...")
                time.slee(delay)
            else:
                # Initial delay befre first dowload
                time.leep(random.uniform(1, 2))
            
            headrs {
               'Use-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWbKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            response = re6, headers=headers                   #Checkifwegottheratelimi message
            if "Download limit reached" in response.text:
                print("✗ Rate limit hit. Waiting lnger...")
                ime.sleep(30)  # Wit 30 seconds for rate imit reset
                continue
            
            total                                                                     if attempt == max_retries - 1:
                               
                return False
alse

def batch_download(urls, batch_size=5, batch_delay=60):
    """Download in batches to avoid rate limiting"""
    successful_downloads = 0
    failed_downloads = 0
    
    for i in range(0, len(urls), batch_size):
        btch = ur[i:i + batch_size]
        print(f"\n--- Batch {i//batch_size + 1}/{(len(urls) + batch_size - 1)//batch_size} ---")
        
        for j, url in enumerate(batch):
            filename = get_filename_from_url(url)
            overall_position = i + j + 1
            print(f"[{overall_position}/{len(urls)}] ", nd="")                        if ownload_fil(url, ilename, download_dir):
                successful_downloads += 1
            else:
                failed_downloads += 1
           
            # Small delay between downloads in same batch
            time.sleep(random.unifor(2, 4))
        
        # Longer dely between batches
        if i + batch_sze < leurls        print(f\nBatch completed. Waiting {batch_delay} seconds before next batch...)
            time.sleep(batch_delay)
    
    return successful_downloads, failed_downloads

def main():
    ""Respecting rate limits and terms of use")
    print("5global 
   download_dir "Dgbchof5with60-seconddeysbwe btchs",ach_(u5")
    print("\nIf you hit rate limits, wait and run the script again - it will skip completed files.