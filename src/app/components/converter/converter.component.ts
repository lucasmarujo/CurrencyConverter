import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { CURRENCIES, Currency } from '../../models/currency.model';
import { finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {
  converterForm: FormGroup;
  currencies: Currency[] = CURRENCIES;
  result: number | null = null;
  loading = false;
  error = false;
  lastUpdated: Date | null = null;
  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.converterForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(0.01)]],
      fromCurrency: ['USD', Validators.required],
      toCurrency: ['EUR', Validators.required]
    });
  }

  ngOnInit(): void {
    // Subscribe to form value changes to trigger automatic conversion
    this.formSubscription = this.converterForm.valueChanges
      .pipe(
        debounceTime(500), // Wait for 500ms of inactivity
        distinctUntilChanged((prev, curr) => {
          // Only trigger if values actually changed
          return prev.amount === curr.amount && 
                 prev.fromCurrency === curr.fromCurrency && 
                 prev.toCurrency === curr.toCurrency;
        })
      )
      .subscribe(() => {
        if (this.converterForm.valid) {
          this.convert();
        }
      });
    
    // Initialize with default conversion
    this.convert();
  }
  
  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  convert(): void {
    if (this.converterForm.invalid) {
      return;
    }

    const { amount, fromCurrency, toCurrency } = this.converterForm.value;
    
    this.loading = true;
    this.error = false;
    
    this.currencyService.convertCurrency(amount, fromCurrency, toCurrency)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.lastUpdated = new Date();
        })
      )
      .subscribe({
        next: (convertedAmount) => {
          this.result = convertedAmount;
        },
        error: (err) => {
          console.error('Conversion error:', err);
          this.error = true;
          this.result = null;
        }
      });
  }

  swapCurrencies(): void {
    const currentValues = this.converterForm.value;
    this.converterForm.patchValue({
      fromCurrency: currentValues.toCurrency,
      toCurrency: currentValues.fromCurrency
    });
    this.convert();
  }
}