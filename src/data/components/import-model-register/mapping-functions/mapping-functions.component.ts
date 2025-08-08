import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Destination, Mapping } from '../../../models/mapping.model';
import { MappingFunction, FunctionText } from '../../../models/mapping-function.model';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';

@Component({
  selector: 'lib-mapping-functions',
  templateUrl: './mapping-functions.component.html',
  styleUrls: ['./mapping-functions.component.scss'],
})
export class MappingFunctionsComponent implements OnInit {

  @Input() mapping: Mapping;
  @Input() disabled: boolean = false;

  private readonly functionConfigs = {
    [FunctionText.RSC]: { defaultConfig: '*', hasConfig: true },
    [FunctionText.RL]: { defaultConfig: '*', hasConfig: true },
    [FunctionText.RD]: { defaultConfig: '*', hasConfig: true },
    [FunctionText.RLC]: { defaultConfig: '1', hasConfig: true },
    [FunctionText.RRC]: { defaultConfig: '1', hasConfig: true },
    [FunctionText.TSW]: { defaultConfig: null, hasConfig: false },
    [FunctionText.RAW]: { defaultConfig: null, hasConfig: false },
    [FunctionText.FMT]: { defaultConfig: '', hasConfig: true },
    [FunctionText.TUP]: { defaultConfig: null, hasConfig: false },
    [FunctionText.TLW]: { defaultConfig: null, hasConfig: false },
    [FunctionText.TEW]: { defaultConfig: null, hasConfig: false },
    [FunctionText.CPT]: { defaultConfig: '1..5', hasConfig: true },
  };

  mappingFunctions: { [key: string]: MappingFunction } = {};
  isInitialized = false;

  constructor(private framework: FrameworkService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.initializeComponent();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['mapping'] && changes['mapping'].currentValue) {
      await this.initializeComponent();
    }
  }

  private async initializeComponent() {
    this.cdr.detectChanges();
    this.isInitialized = false;
    await this.initializeFunctions();
    this.loadExistingFunctions();
    this.cdr.detectChanges();
    this.isInitialized = true;
  }

  async reinitialize() {
    await this.initializeComponent();
  }

  private async initializeFunctions() {
    const functionKeys = Object.keys(this.functionConfigs) as FunctionText[];

    for (const functionType of functionKeys) {
      const config = this.functionConfigs[functionType];
      const functionKey = this.getFunctionKey(functionType);

      this.mappingFunctions[functionKey] = {
        function: functionType,
        configuration: config.defaultConfig,
        index: 0,
        active: false,
        textInformation: config.hasConfig ? await this.getTextInformation(functionType) : undefined
      };
    }
  }

  private loadExistingFunctions() {
    if (!this.mapping?.functions) return;

    this.mapping.functions.forEach(existingFunction => {
      const functionKey = this.getFunctionKey(existingFunction.function);

      if (this.mappingFunctions[functionKey]) {
        this.mappingFunctions[functionKey] = {
          ...this.mappingFunctions[functionKey],
          ...existingFunction,
          active: true
        };
      }
    });
  }

  private getFunctionKey(functionType: FunctionText): string {
    const keyMap = {
      [FunctionText.RSC]: 'mappingFunctionRSC',
      [FunctionText.RL]: 'mappingFunctionRL',
      [FunctionText.RD]: 'mappingFunctionRD',
      [FunctionText.RLC]: 'mappingFunctionRLC',
      [FunctionText.RRC]: 'mappingFunctionRRC',
      [FunctionText.TSW]: 'mappingFunctionTSW',
      [FunctionText.RAW]: 'mappingFunctionRAW',
      [FunctionText.FMT]: 'mappingFunctionFMT',
      [FunctionText.TUP]: 'mappingFunctionTUP',
      [FunctionText.TLW]: 'mappingFunctionTLW',
      [FunctionText.TEW]: 'mappingFunctionTEW',
      [FunctionText.CPT]: 'mappingFunctionCPT',
    };

    return keyMap[functionType];
  }

  private async getTextInformation(functionType: FunctionText): Promise<any[]> {
    const infoKeyMap = {
      [FunctionText.RSC]: 'FUNCTIONS.CONFIGURATION_RSC_INFORMATION',
      [FunctionText.RL]: 'FUNCTIONS.CONFIGURATION_RL_INFORMATION',
      [FunctionText.RD]: 'FUNCTIONS.CONFIGURATION_RD_INFORMATION',
      [FunctionText.RLC]: 'FUNCTIONS.CONFIGURATION_RLC_INFORMATION',
      [FunctionText.RRC]: 'FUNCTIONS.CONFIGURATION_RRC_INFORMATION',
      [FunctionText.TSW]: 'FUNCTIONS.CONFIGURATION_TSW_INFORMATION',
      [FunctionText.RAW]: 'FUNCTIONS.CONFIGURATION_RAW_INFORMATION',
      [FunctionText.FMT]: 'FUNCTIONS.CONFIGURATION_FMT_INFORMATION',
      [FunctionText.TUP]: 'FUNCTIONS.CONFIGURATION_TUP_INFORMATION',
      [FunctionText.TLW]: 'FUNCTIONS.CONFIGURATION_TLW_INFORMATION',
      [FunctionText.TEW]: 'FUNCTIONS.CONFIGURATION_TEW_INFORMATION',
      [FunctionText.CPT]: 'FUNCTIONS.CONFIGURATION_CPT_INFORMATION',
    };

    const key = infoKeyMap[functionType];
    if (!key) return [];

    try {
      const detail = await this.framework.utils.getTextTranslated(key);
      return [{ severity: 'info', detail }];
    } catch (error) {
      console.warn(`Falha ao obter texto traduzido para ${key}:`, error);
      return [];
    }
  }

  updateMapping() {
    const activeFunctions = Object.values(this.mappingFunctions)
      .filter(func => func.active)
      .map((func, index) => ({
        ...func,
        index,
        active: undefined,
        textInformation: undefined
      }))
      .filter(func => {
        delete func.active;
        delete func.textInformation;
        return true;
      });

    this.mapping.functions = activeFunctions;
  }

  onActiveChange(functionKey: string) {
    setTimeout(() => this.updateMapping(), 0);
  }

  onConfigurationChange(functionKey: string) {
    setTimeout(() => this.updateMapping(), 0);
  }

  get mappingFunctionRSC() { return this.mappingFunctions['mappingFunctionRSC'] || this.getEmptyFunction(FunctionText.RSC); }
  get mappingFunctionRL() { return this.mappingFunctions['mappingFunctionRL'] || this.getEmptyFunction(FunctionText.RL); }
  get mappingFunctionRD() { return this.mappingFunctions['mappingFunctionRD'] || this.getEmptyFunction(FunctionText.RD); }
  get mappingFunctionRLC() { return this.mappingFunctions['mappingFunctionRLC'] || this.getEmptyFunction(FunctionText.RLC); }
  get mappingFunctionRRC() { return this.mappingFunctions['mappingFunctionRRC'] || this.getEmptyFunction(FunctionText.RRC); }
  get mappingFunctionTSW() { return this.mappingFunctions['mappingFunctionTSW'] || this.getEmptyFunction(FunctionText.TSW); }
  get mappingFunctionRAW() { return this.mappingFunctions['mappingFunctionRAW'] || this.getEmptyFunction(FunctionText.RAW); }
  get mappingFunctionFMT() { return this.mappingFunctions['mappingFunctionFMT'] || this.getEmptyFunction(FunctionText.FMT); }
  get mappingFunctionTUP() { return this.mappingFunctions['mappingFunctionTUP'] || this.getEmptyFunction(FunctionText.TUP); }
  get mappingFunctionTLW() { return this.mappingFunctions['mappingFunctionTLW'] || this.getEmptyFunction(FunctionText.TLW); }
  get mappingFunctionTEW() { return this.mappingFunctions['mappingFunctionTEW'] || this.getEmptyFunction(FunctionText.TEW); }
  get mappingFunctionCPT() { return this.mappingFunctions['mappingFunctionCPT'] || this.getEmptyFunction(FunctionText.CPT); }

  private getEmptyFunction(functionType: FunctionText): MappingFunction {
    const config = this.functionConfigs[functionType];
    return {
      function: functionType,
      configuration: config?.defaultConfig || null,
      index: 0,
      active: false,
      textInformation: []
    };
  }
}
